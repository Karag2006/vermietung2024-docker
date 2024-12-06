<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\CleanupWasSuccessfulNotification as BaseNotification;

class CleanupWasSuccessfulNotification extends BaseNotification
{
    use Queueable;

     public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Cleanup erfolgreich');
        $message->body("Erfolgreich alte Backups gelöscht.");
        $message->tags(['white_check_mark', 'ok_hand']);

        return $message;
    }
}
