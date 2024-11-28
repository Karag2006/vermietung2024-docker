<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */


    'accepted' => 'The :attribute must be accepted.',
    'accepted_if' => 'The :attribute must be accepted when :other is :value.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute must only contain letters.',
    'alpha_dash' => 'The :attribute must only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute must only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => ':attribute und Wiederholung stimmen nicht überein',
    'current_password' => 'Das Passwort ist falsch.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'Muss eine korrekte Email Adresse sein',
    'ends_with' => 'The :attribute must end with one of the following: :values.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'Die ausgewählte :attribute ist ungültig.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'Nur Zahlen erlaubt',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'Muss weniger als :value sein.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'Der Wert darf maximal :max sein',
        'file' => 'The :attribute must not be greater than :max kilobytes.',
        'string' => 'Es sind maximal :max Zeichen erlaubt',
        'array' => 'The :attribute must not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'Der Wert muss mindestens :min sein',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'Es werden mindestens :min Zeichen benötigt',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'multiple_of' => 'The :attribute must be a multiple of :value.',
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'Nur Zahlen erlaubt',
    'password' => 'Das Passwort ist falsch.',
    'present' => 'The :attribute field must be present.',
    'regex' => 'Das Format ist nicht korrekt',
    'required' => 'darf nicht leer sein',
    'required_if' => 'darf nicht leer sein, wenn ":other" gesetzt ist',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'darf nicht leer sein wenn ":values" angegeben ist.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'darf nicht leer sein wenn ":values" leer ist.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'prohibited' => 'The :attribute field is prohibited.',
    'prohibited_if' => 'The :attribute field is prohibited when :other is :value.',
    'prohibited_unless' => 'The :attribute field is prohibited unless :other is in :values.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values.',
    'string' => 'Muss eine Zeichenkette enthalten',
    'timezone' => 'The :attribute must be a valid timezone.',
    'unique' => ':attribute ist bereits vergeben.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute must be a valid URL.',
    'uuid' => 'The :attribute must be a valid UUID.',






    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'customer_birth_date' => [
            'regex' => 'muss im Format dd.mm.YYYY angegeben werden.',
        ],
        'customer_plz' => [
            'regex' => 'muss eine deutsche Postleitzahl sein',
        ],
        'driver_birth_date' => [
            'regex' => 'muss im Format dd.mm.YYYY angegeben werden.',
        ],
        'driver_plz' => [
            'regex' => 'muss eine deutsche Postleitzahl sein',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        // global

        'name' => 'Name',
        'email' => 'E-Mail Adresse',
        'comment' => 'Kommentar',

        // User

        'username' => 'Benutzername',
        'password' => 'Passwort',

        // Customer

        'pass_number' => 'Ausweisnummer',
        'name1' => 'Name',
        'name2' => 'Name 2',
        'birth_date' => 'Geburtsdatum',
        'birth_city' => 'Geburtsstadt',
        'plz' => 'Postleitzahl',
        'city' => 'Stadt',
        'street' => 'Straße und Hausnummer',
        'phone' => 'Telefonnummer',
        'car_number' => 'Kennzeichen',
        'driving_license_no' => 'Führerscheinnummer',
        'driving_license_class' => 'Führerscheinklasse',


        // Equipment

        'details'       => 'Details',
        'defaultNumber' => 'standard Anzahl',

        // Trailer

        'title' => 'Bezeichnung',
        'plateNumber' => 'Kennzeichen',
        'chassisNumber' => 'Fahrgestellnummer',
        'tuev' => 'TÜV',
        'inspection_at' => 'Nächster TÜV Termin',
        'totalWeight' => 'zulässiges Gesamtgewicht',
        'usableWeight' => 'Nutzlast',
        'loading_size' => 'Lademaße',
        'loading_size.0' => 'Länge',
        'loading_size.1' => 'Breite',
        'loading_size.2' => 'Höhe',
    ],

];
