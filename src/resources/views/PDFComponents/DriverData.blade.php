@if ($document->current_state == "contract")
    <tr>
        <td class="txt-bold">Fahrer:</td>
        @if(!$document->driver_name1)
            <td class="td-info">
                {{ $document->customer_name2 ?? $document->customer_name1 }}
            </td>
        @else
            <td class="td-info">
                {{ $document->driver_name2 ?? $document->driver_name1 }}
            </td>
        @endif

        <td class="txt-bold pl-4">FS Klasse & Nr.</td>
        {{-- TODO: use spans with margins / paddings 
            instead of blankspaces to format  --}}
        <td class="td-info">
            {{ $document->driver_driving_license_class ?? $document->customer_driving_license_class }} &nbsp;	&nbsp;	&nbsp;	&nbsp;	| &nbsp;	&nbsp; {{ $document->driver_driving_license_no ?? $document->customer_driving_license_no }}
        </td>
    </tr>
    <tr>
        <td class="txt-bold">Adresse:</td>
        <td class="td-info">
            {{ $document->driver_street ?? $document->customer_street  }}
            {{ $document->driver_plz ?? $document->customer_plz  }}
            {{ $document->driver_city ?? $document->customer_city  }}
        </td>
@else
    <tr>
        <td > </td>
        <td  ></td>
@endif
    <td class="txt-bold pl-4">Mitarbeiter: </td>
    <td class="td-info"> {{ $user ?? '' }}</td>
</tr>
