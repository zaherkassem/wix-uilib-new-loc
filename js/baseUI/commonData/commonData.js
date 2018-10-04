define([], function () {
    'use strict';

    return {
        TEXT_DISPLAY_ITEMS: [
            {value: 'titleAndDescription', label: 'Gallery_Settings_Text_Display_Title_Description'},
            {value: 'titleOnly', label: 'Gallery_Settings_Text_Display_Title_Only'},
            {value: 'descriptionOnly', label: 'Gallery_Settings_Text_Display_Description_Only'},
            {value: 'noText', label: 'Gallery_Settings_Text_Display_No_Text'}
        ],
        ALIGNMENT_MODES: [
            {
                value: 'left',
                symbolName: 'alignLeft'
            },
            {
                value: 'center',
                symbolName: 'alignCenter'
            },
            {
                value: 'right',
                symbolName: 'alignRight'
            }
        ],

        ALIGNMENT_MODES_XY: [
            {
                value: 'top_left',
                symbolName: 'alignTypeTopLeft'
            },
            {
                value: 'top',
                symbolName: 'alignTypeTop'
            },
            {
                value: 'top_right',
                symbolName: 'alignTypeTopRight'
            },
            {
                value: 'left',
                symbolName: 'alignTypeLeft'
            },
            {
                value: 'center',
                symbolName: 'alignTypeCenter'
            },
            {
                value: 'right',
                symbolName: 'alignTypeRight'
            },
            {
                value: 'bottom_left',
                symbolName: 'alignTypeBottomLeft'
            },
            {
                value: 'bottom',
                symbolName: 'alignTypeBottom'
            },
            {
                value: 'bottom_right',
                symbolName: 'alignTypeBottomRight'
            }
        ],
        GALLERIES_IMAGE_ON_CLICK_ACTIONS: [
            {
                value: 'disabled',
                label: 'Gallery_Settings_Image_Behavior_Image_Click_Nothing'
            },
            {
                value: 'zoomMode',
                label: 'Gallery_Settings_Image_Behavior_Image_Click_Expand'
            },
            {
                value: 'goToLink',
                label: 'Gallery_Settings_Image_Behavior_Image_Click_Gotolink'
            }
        ]
    };
});
