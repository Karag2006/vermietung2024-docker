<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\BackupWasSuccessfulNotification as BaseNotification;


class BackupWasSuccessfulNotification extends BaseNotification
{
    use Queueable;

    public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Backup erfolgreich');
        $message->body("Backup für Escobar-Vermietung erfolgreich durchgeführt.");
        $message->tags(['white_check_mark', 'ok_hand']);

        return $message;
    }


}
