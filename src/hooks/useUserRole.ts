import { getUserRole } from "@/services/auth-token";
import { useEffect, useState } from "react";

export default function useAdminRole(): boolean {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkRole = async () => {
      const role = await getUserRole();
      if (role === 'Admin') {
        setIsAdmin(true);
      }
    }
    checkRole();
  }, []);

  return isAdmin;
}
