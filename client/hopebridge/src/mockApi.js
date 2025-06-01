export const registerUser = async (data) => {
    console.log("User registered:", data);
    return { message: "Success" };
  };
  
  export const loginUser = async (data) => {
    const mockUser = {
      user: {
        name: "John Doe",
        email: data.email,
        role: data.email.includes("admin") ? "admin" : data.email.includes("nri") ? "nri" : "volunteer",
      },
      token: "mock-jwt-token",
    };
    return mockUser;
  };