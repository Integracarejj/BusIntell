
// components/ToggleRole.tsx
"use client";

type Role = "AGM" | "Executive";

type ToggleRoleProps = {
    role: Role;
    setRole: (role: Role) => void;
};

export default function ToggleRole({ role, setRole }: ToggleRoleProps) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-semibold">Role:</span>
            <select
                className="border rounded px-2 py-1"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
            >
                <option value="AGM">AGM</option>
                <option value="Executive">Executive</option>
            </select>
        </div>
    );
}
