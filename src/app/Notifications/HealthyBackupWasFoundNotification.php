<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\HealthyBackupWasFoundNotification as BaseNotification;

class HealthyBackupWasFoundNotification extends BaseNotification
{
    use Queueable;

     public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Backup Healthcheck successful');
        $message->body("Last backup was successful and is healthy.");
        $message->tags(['white_check_mark', 'ok_hand']);

        return $message;
    }
}
