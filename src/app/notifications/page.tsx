import { Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function NotificationsPage() {
  const notifications: any[] = [];
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Bell className="h-8 w-8 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Notifications
            </h1>
            <p className="text-muted-foreground">
            Your recent updates and alerts from EN-VERSE.
            </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="p-4 grid grid-cols-[25px_1fr] items-start">
                 <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  <div className="grid gap-1">
                    <p className="font-medium">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                     <p className="text-xs text-muted-foreground/70 pt-1">
                        {notification.date}
                    </p>
                  </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>You have no notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
