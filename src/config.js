// Prefer Vite env, then CRA-style env, then localhost fallback
export const API_URL =
	import.meta?.env?.VITE_BASE_API_URL ||
	process.env?.REACT_APP_API_URL ||
	"";
