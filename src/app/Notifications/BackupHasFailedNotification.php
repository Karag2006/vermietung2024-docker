<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\BackupHasFailedNotification as BaseNotification;


class BackupHasFailedNotification extends BaseNotification
{
    use Queueable;

    public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Backup Failed');
        $message->body("Backup für Escobar-Vermietung konnte nicht ausgeführt werden.");
        $message->tags(['bangbang', 'rotating_light']);

        return $message;
    }


}
