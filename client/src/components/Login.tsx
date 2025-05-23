import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import "./Modal.css";
import dummyUser from "../data/dummyUser.json";
import { setToken } from "../utils/auth";

interface LoginProps {
	onClose: () => void;
	switchToJoinUs: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, switchToJoinUs }) => {
	const [username, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const [loginUser] = useMutation(LOGIN_USER);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			setError("Both fields are required.");
			return;
		}

		try {
			const { data } = await loginUser({
				variables: { username, password },
			});

			const token = data?.login?.token;
			const userId = data?.login?.user?._id;

			if (token) {
				setToken(token, userId); // ✅ Save token + user ID
				alert("Logged in successfully! 🎉");
				window.location.reload();
				onClose();
			} else {
				setError("Login failed. Please try again.");
			}
		} catch {
			// fallback to dummy user login
			if (username === dummyUser[0].username && password === dummyUser[0].password) {
				setToken("dummy-auth-token", "dummy-user-id");
				alert("Dummy login successful! 🎭");
				window.location.reload();
				onClose();
			} else {
				setError("Invalid credentials. Please try again.");
			}
		}
	};

	return (
		<div   className="modal-backdrop"
		onClick={(e) => {
		  // Only close if the click was on the backdrop itself, not inside modal
		  if (e.target === e.currentTarget) {
			onClose();
		  }
		}}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button
					className="close-btn"
					type="button"
					aria-label="Close"
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						boxShadow: "none",
						outline: "none",
						padding: 0,
						zIndex: 99999,
					}}
				>
					❎
				</button>

				<h2
					style={{
						color: "white",
						textAlign: "center",
						background:
							"linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
						padding: "10px",
						borderRadius: "5px",
					}}
				>
					Welcome Back
				</h2>

				{error && <p className="error">{error}</p>}

				<form onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>

					<div style={{ position: "relative" }}>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							style={{ width: "100%" }}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: "absolute",
								right: "10px",
								top: "50%",
								transform: "translateY(-50%)",
								background: "transparent",
								border: "none",
								color: "#666",
								cursor: "pointer",
							}}
							aria-label="Toggle password visibility"
						>
							{showPassword ? "🙈 Hide" : "👁️ Show"}
						</button>
					</div>

					<button
						type="submit"
						style={{
							background:
								"linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
							color: "white",
							padding: "10px 20px",
							borderRadius: "50px",
							border: "none",
							cursor: "pointer",
							marginTop: "10px",
						}}
					>
						Log In
					</button>
				</form>

				<p
					className="bottom-section"
					style={{
						color: "white",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "8px",
						marginTop: "10px",
					}}
				>
					Don’t have an account?{" "}
					<button
						type="button"
						onClick={switchToJoinUs}
						style={{
							background:
								"linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
							color: "white",
							padding: "10px 20px",
							borderRadius: "50px",
							border: "none",
							cursor: "pointer",
						}}
					>
						Join us here.
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
