<tr>
    <td class="tdOne text-left txt-bold txt-lg">Kaution:</td>
    <td class="tdTwo td-info text-right txt-bold pl-2">
        {{ $document->contract_bail ? number_format($document->contract_bail , 2) ." €" : "" }}
    </td>

    @if ($document->current_state == 'contract')
        <td class="tdThree text-left txt-bold txt-lg pl-2">Erhalten:</td>
        <td class="tdFour text-left txt-bold pl-2">_____________</td>
        <td class="tdFive text-left txt-bold txt-lg pl-2">Erstattet :</td>
        <td class="tdSix text-left txt-bold pl-2">_____________</td>

    @else
        <td class="tdThreeToEnd text-left txt-bold txt-lg pl-2" colspan="4">
            Bei Abholung in Bar zu hinterlegen
        </td>

    @endif
</tr>

@if ($document->current_state == 'contract')
    <tr class="bailRowTwo">
        <td class="tdOne text-left txt-bold txt-lg">&nbsp;</td>
        <td class="tdTwo text-right txt-bold pl-2"></td>

        @if ($document->contract_bail_recieved)
            <td class="tdThree td-info text-left txt-bold">
                {{ $document->contract_bail_date ? $document->contract_bail_date : '' }}
            </td>
            <td class="tdFour td-info text-left txt-bold">
                {{ $document->contract_bail_type ?? '' }}
            </td>

        @else
            <td class="tdThree text-left txt-bold"></td>
            <td class="tdFour text-left txt-bold"></td>
        @endif

        @if ($document->contract_bail_returned)
            <td class="tdFive td-info text-left txt-bold">
                {{ $document->contract_bail_return_date ? $document->contract_bail_return_date : '' }}
            </td>
            <td class="tdSix td-info text-left txt-bold">
                {{ $document->contract_bail_return_type ?? '' }}
            </td>

        @else
            <td class="tdFive text-left txt-bold"></td>
            <td class="tdSix text-left txt-bold"></td>
        @endif
    </tr>
@endif
