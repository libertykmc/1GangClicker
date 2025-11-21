import { ref } from "vue";
import type { Icon } from "./types";

export const money = ref<number>(+(localStorage.getItem("money") || "0"));
export const energy = ref<number>(+(localStorage.getItem("energy") || "1000"));
export const isDead = ref(false);

// Profile avatar (the user's photo/image)
export const avatar = ref<Icon>(
    (localStorage.getItem("profile_avatar") as Icon) || "people"
);

// Character skin (the in-game character appearance)
export const currentSkin = ref<Icon>(
    (localStorage.getItem("character_skin") as Icon) || "people"
);

export interface Achievement {
    id: string;
    title: string;
    description: string;
    target: number;
    unlocked: boolean;
}

export const achievements = ref<Achievement[]>([
    {
        id: "earn_10",
        title: "Первые деньги",
        description: "Заработать 10$",
        target: 10,
        unlocked: JSON.parse(
            localStorage.getItem("achievement_earn_10") || "false"
        ),
    },
    {
        id: "earn_100",
        title: "Состоятельный",
        description: "Заработать 100$",
        target: 100,
        unlocked: JSON.parse(
            localStorage.getItem("achievement_earn_100") || "false"
        ),
    },
    {
        id: "earn_1000",
        title: "Миллионер",
        description: "Заработать 1,000$",
        target: 1000,
        unlocked: JSON.parse(
            localStorage.getItem("achievement_earn_1000") || "false"
        ),
    },
]);

export async function checkAchievements() {
    const userId = localStorage.getItem("userId");
    for (const achievement of achievements.value) {
        if (!achievement.unlocked && money.value >= achievement.target) {
            achievement.unlocked = true;
            localStorage.setItem(`achievement_${achievement.id}`, "true");
            if (userId) {
                try {
                    const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
                    await fetch(`${API_BASE}/players/achievement`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId, achievementId: achievement.id }),
                        credentials: "include",
                    });
                } catch { }
            }
        }
    }
}
