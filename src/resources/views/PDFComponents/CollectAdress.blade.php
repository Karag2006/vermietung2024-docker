<div class="collectAdressContainer">
    <span class="collectAdressSpan">
        Abholanschrift : {{ $document->collectAddress->address ?? '' }}
    </span>
    @unless ($document->current_state === 'contract')
       Das Fahrzeug kann nur zum genannten Abholtermin in Empfang genommen werden!
    @endunless
</div>
