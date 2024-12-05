<?php

namespace App\Console\Commands;

use App\Http\Controllers\DocumentController;
use Illuminate\Console\Command;

class Daily extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tp24:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily operations to be executed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running Daily Tasks ...');

        // Archiviere Dokumente die abgelaufen sind.
        $this->info('Archiving Documents ...');
        DocumentController::archiveDocuments();

        // Prüfe Dokumente (Mietverträge) auf Kollisionen und korrigiere diese.
        $this->info('Checking for active Documents with overlapping dates ...');
        DocumentController::fixCollisions();

        // Mache ein Datenbank Backup
        $this->info('Backing up the Database ...');
        $this->call('backup:run', [
            '--only-db' => true,
        ]);

        $this->info('Cleaning up old backups ...');
        $this->call('backup:clean');

        $this->info('Daily Tasks completed.');
    }
}
