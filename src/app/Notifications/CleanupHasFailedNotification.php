<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\CleanupHasFailedNotification as BaseNotification;

class CleanupHasFailedNotification extends BaseNotification
{
    use Queueable;

    public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Cleanup Failed');
        $message->body("The cleanup of the backup for Escobar-Vermietung has failed !!");
        $message->tags(['bangbang']);

        return $message;
    }
}
