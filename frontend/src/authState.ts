import { ref } from "vue";

export const isAuthenticated = ref(false);
export const isAuthChecked = ref(false);

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

export async function checkAuth(force = false) {
    if (isAuthChecked.value && !force) return;
    try {
        const res = await fetch(`${API_BASE}/auth/profile`, { credentials: "include" });
        if (res.ok) {
            isAuthenticated.value = true;
        } else {
            isAuthenticated.value = false;
        }
    } catch {
        isAuthenticated.value = false;
    } finally {
        isAuthChecked.value = true;
    }
}
