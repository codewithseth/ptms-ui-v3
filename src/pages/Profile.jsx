import { currentUser } from "../data/mockData";
import Card from "../components/Card";

const roleColors = {
  Admin: "bg-red-100 text-red-700 border-red-200",
  Manager: "bg-blue-100 text-blue-700 border-blue-200",
  Developer: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Tester: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Designer: "bg-purple-100 text-purple-700 border-purple-200",
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-50 last:border-0 gap-1 sm:gap-0">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-36">
      {label}
    </span>
    <span className="text-sm text-gray-700 font-medium">{value}</span>
  </div>
);

const Profile = () => {
  const roleClass =
    roleColors[currentUser.roles] ||
    "bg-gray-100 text-gray-600 border-gray-200";
  const initials = currentUser.username.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-lg space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
        <p className="text-sm text-gray-500">Your account information</p>
      </div>

      <Card>
        {/* Avatar section */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
          <div
            className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white
            text-xl font-bold shadow-md select-none"
          >
            {initials}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">
              {currentUser.username}
            </h3>
            <span
              className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium border ${roleClass}`}
            >
              {currentUser.roles}
            </span>
          </div>
        </div>

        {/* Details */}
        <div>
          <InfoRow label="User ID" value={`#${currentUser.id}`} />
          <InfoRow label="Username" value={currentUser.username} />
          <InfoRow label="Role" value={currentUser.roles} />
          <InfoRow label="Member Since" value={currentUser.created_at} />
        </div>
      </Card>

      {/* Security note */}
      <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
        <svg
          className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
          />
        </svg>
        <p className="text-xs text-indigo-600 leading-relaxed">
          This is your profile page. Contact an administrator to update your
          account information or change your password.
        </p>
      </div>
    </div>
  );
};

export default Profile;
