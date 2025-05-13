
import { Bell } from "lucide-react";

const NotificationsPage = () => {
  // In a real app, this would fetch notifications from a backend or service like OneSignal
  const notifications = []; // Empty for demo

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Bell className="h-8 w-8 text-news-secondary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No notifications yet</h2>
            <p className="text-news-secondary">
              We'll notify you when there are important updates
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id}>
                {/* Notification item */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
