<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Ntfy\Message;
use Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFoundNotification as BaseNotification;

class UnhealthyBackupWasFoundNotification extends BaseNotification
{
    use Queueable;


    public function toNtfy(mixed $notifiable): Message
    {
        $message = new Message();
        $message->topic('backup');
        $message->title('Healthcheck Failed');
        $message->body("The Healthchek for the backup for Escobar-Vermietung has failed !!");
        $message->tags(['bangbang']);

        return $message;
    }
}
