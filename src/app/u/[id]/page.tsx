import { Suspense } from "react";
import Profile from "@/components/pages/Profile";

const ProfilePage = () => {
  return (
    <Suspense fallback={null}>
      <Profile />
    </Suspense>
  );
};

export default ProfilePage;
