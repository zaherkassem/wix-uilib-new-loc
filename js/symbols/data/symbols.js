define(['lodash'], function(_) {
	"use strict";

    var aliases = {
        PPOpenMonthlyArrow: 'playAnimation',
        infoSmall: 'info',
        mobileCompWithLink: 'link',
        'image-change': 'imageChange',
        'image-effects': 'imageEffects',
        globe: 'globus'
    };

    var addAliases = function (symbols, aliases) {
        _.forEach(aliases, function (value, key) {
            symbols[value] = symbols[key];
        });
        return symbols;
    };

    var customIcons = {
      "premiumBanner": {
        "svg": {
          "width": "14",
          "height": "13",
          "viewBox": "0 0 14 13"
        },
        "content": (<path fill="#aa4dc8" fillRule="evenodd" d="M617,397v2h12v-2H617Zm11-11v1a2,2,0,0,1-4,0v-1h-2v1a2,2,0,0,1-4,0v-1h-2l0.875,10h12.25L630,386h-2Z" transform="translate(-616 -386)"/>)
      },
        "tooltipWarning": {
            "svg": {
                "width": "16",
                "height": "16",
                "viewBox": "0 0 16 16"
            },
            "content": (<g><circle fill="#ee5951" cx="8" cy="8" r="8"/> <rect fill="#fff" x="7" y="3" width="2" height="5"/> <rect fill="#fff" x="7" y="10" width="2" height="2"/></g>)
        },
        "globe": {
            "svg": {
                "width": "16",
                "height": "19",
                "viewBox": "0 0 16 19"
            },
            "content": (<path fill="#2B5672" fillRule="evenodd" d="M9.005 13.955a6.958 6.958 0 0 1-4.948-2.046 6.937 6.937 0 0 1-2.05-4.94c.002-1.696.603-3.3 1.704-4.568l1.44 1.45a4.96 4.96 0 0 0-1.256 3.282 5 5 0 0 0 5 5c1.325 0 2.52-.524 3.416-1.366l1.296 1.464a6.953 6.953 0 0 1-4.601 1.723m-.11-10.857a4.04 4.04 0 0 1 4.036 4.036 4.04 4.04 0 0 1-4.035 4.037A4.04 4.04 0 0 1 4.86 7.135a4.04 4.04 0 0 1 4.035-4.036m5.77 9.523l.335-.334-2.02-2.282a4.97 4.97 0 0 0 .915-2.87 5 5 0 0 0-5-5 4.95 4.95 0 0 0-3.012 1.033L3.703 1l-.358.32A7.93 7.93 0 0 0 1 6.97c0 2.135.833 4.142 2.345 5.65a7.942 7.942 0 0 0 5.196 2.32L8.543 17h-2v1h5v-1h-2v-2.064a7.946 7.946 0 0 0 5.123-2.315" />)
        },
        "phone": {
            "svg": {
                "width": "16",
                "height": "19",
                "viewBox": "0 0 16 19"
            },
            "content": (<path fill="#2B5672" fillRule="evenodd" d="M5.008 3.2l-.644.49A3.484 3.484 0 0 0 3.02 5.993a3.514 3.514 0 0 0 .647 2.596l4.055 5.52a3.394 3.394 0 0 0 4.813.708l.646-.49-1.915-2.606-1.28.973a.485.485 0 0 1-.69-.1L5.543 7.48a.507.507 0 0 1 .1-.698l1.28-.974L5.01 3.2zm5.472 13.315a4.42 4.42 0 0 1-3.546-1.807L2.88 9.188a4.528 4.528 0 0 1-.834-3.34c.17-1.188.783-2.24 1.73-2.958l1.037-.79a.485.485 0 0 1 .688.102L8.005 5.61a.503.503 0 0 1-.1.7l-1.28.974 3.165 4.31 1.28-.973a.484.484 0 0 1 .688.103l2.504 3.408a.506.506 0 0 1-.1.7l-1.04.79a4.332 4.332 0 0 1-2.642.895z" />)
        },
        "premiumLarge": {
            "svg": {
                "width": "21",
                "height": "21",
                "viewBox": "0 0 21 21"
            },
            "content": (<g><circle cx="10.5" cy="10.5" r="10" fill="#aa34ca" stroke="#fff"/><path d="M15.5,6.5H14.3A1.6,1.6,0,0,1,13,8.4h-.3c-1.8,0-1.6-1.9-1.6-1.9H9.9A1.58,1.58,0,0,1,8.7,8.4H8.3A1.58,1.58,0,0,1,6.7,6.8V6.5H5.5l.6,8.1h8.8Z" fill="#fff"/></g>)
        },
        "premiumSmall": {
            "svg": {
                "width": "12",
                "height": "10",
                "viewBox": "0 0 12 10"
            },
            "content": (<path fill="#AA4DC8" fillRule="evenodd" d="M11 1H9.75s.228 1.942-1.572 1.942S6.625 1 6.625 1h-1.25s.3 1.928-1.523 1.928S2.25 1 2.25 1H1l1 8h8l1-8z" />)
        },
        "help": {
            "svg": {
                "width": "18",
                "height": "18",
                "viewBox": "0 0 18 18"
            },
            "content": (<path fill="#2b5672" fillRule="evenodd"  d="M11.207 5.047a2.733 2.733 0 0 0-.9-.51 3.37 3.37 0 0 0-1.1-.175 3.62 3.62 0 0 0-1.354.238 2.725 2.725 0 0 0-.994.665 2.973 2.973 0 0 0-.617 1.043 2.464 2.464 0 0 0-.217 1.358h.882a5.152 5.152 0 0 1 .126-1.015 2.333 2.333 0 0 1 .42-.808 1.947 1.947 0 0 1 .708-.542 2.378 2.378 0 0 1 1-.2 2.13 2.13 0 0 1 .77.14 2.037 2.037 0 0 1 .637.385 1.8 1.8 0 0 1 .43.6 1.822 1.822 0 0 1 .16.77 1.95 1.95 0 0 1-.258.994 3.484 3.484 0 0 1-.65.81q-.446.407-.752.73a3.435 3.435 0 0 0-.5.664 1.488 1.488 0 0 0-.28.586 5.89 5.89 0 0 0-.07.887h.876c.01 0 .028-.558.056-.782a1.2 1.2 0 0 1 .168-.485 1.67 1.67 0 0 1 .378-.433c.168-.16.4-.362.7-.66A5.4 5.4 0 0 0 11.7 8.27a2.43 2.43 0 0 0 .343-1.324 2.54 2.54 0 0 0-.224-1.082 2.382 2.382 0 0 0-.613-.817zm-2.665 7.995L8.5 14.57h1.18L9.625 13zM9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 17a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8z"/>)
        },
        "email": {
            "svg": {
                "width": "15",
                "height": "13",
                "viewBox": "0 0 15 13"
            },
            "content": (<path fill="#2b5672" fillRule="evenodd" d="M14.74 1.5A1.487 1.487 0 0 0 13.268 0H1.475A1.487 1.487 0 0 0 0 1.5v10A1.487 1.487 0 0 0 1.475 13h11.792a1.487 1.487 0 0 0 1.474-1.5v-10zM13.525 1L7.4 5.653 1.25 1h12.274zm-.257 11H1.475a1.043 1.043 0 0 1-.492-.918V1.315l6.21 4.765a.34.34 0 0 0 .416 0l6.15-4.718v9.72a1.043 1.043 0 0 1-.493.918z"/>)
        },
        "switch": {
            "svg": {
                "width": "50",
                "height": "28",
                "viewBox": "0 0 50 28"
            },
            "content": (<g><path d="M14 24.5C7.659 24.5 2.5 19.341 2.5 13S7.659 1.5 14 1.5h21c6.341 0 11.5 5.159 11.5 11.5S41.341 24.5 35 24.5H14" className="st1"/><path d="M35 2c6.065 0 11 4.935 11 11s-4.935 11-11 11H14C7.935 24 3 19.065 3 13S7.935 2 14 2h21m0-1H14C7.373 1 2 6.373 2 13s5.373 12 12 12h21c6.627 0 12-5.373 12-12S41.627 1 35 1" className="st2"/> <g className="switch-thumb-regular"> <path d="M25 13.5C25 19.299 20.075 24 14 24S3 19.299 3 13.5v-1C3 6.701 7.925 2 14 2s11 4.701 11 10.5v1" className="switch-thumb-circle"/><path d="M10.008 13.344c.031.205.145.4.334.534l2.781 1.961a.886.886 0 0 0 1.191-.158l3.512-4.385a.778.778 0 0 0-.164-1.13.883.883 0 0 0-1.195.154l-3 3.744-2.103-1.48a.885.885 0 0 0-1.194.163.778.778 0 0 0-.162.597" className="switch-thumb-check"/> <path d="M19 13c0 .552-.497 1-1.111 1h-7.778C9.498 14 9 13.552 9 13s.498-1 1.111-1h7.778c.614 0 1.111.448 1.111 1" className="switch-thumb-minus"/> </g> <g className="switch-thumb-selected"> <path d="M46 13.5C46 19.299 41.075 24 35 24s-11-4.701-11-10.5v-1C24 6.701 28.925 2 35 2s11 4.701 11 10.5v1" className="switch-thumb-circle"/> <path d="M31.008 13.344c.031.205.145.4.334.534l2.781 1.961a.886.886 0 0 0 1.191-.158l3.512-4.385a.778.778 0 0 0-.164-1.13.883.883 0 0 0-1.195.154l-3 3.744-2.103-1.48a.885.885 0 0 0-1.194.163.778.778 0 0 0-.162.597" className="switch-thumb-check"/><path d="M40 13c0 .552-.497 1-1.111 1h-7.778C30.498 14 30 13.552 30 13s.498-1 1.111-1h7.778c.614 0 1.111.448 1.111 1" className="switch-thumb-minus"/></g></g>)
        }
    };

    var editorIcons = {
        "arrowDown": {
            "svg": {
                "width": "12",
                "height": "12",
                "viewBox": "135.1 -517.4 1024 1024"
            },
            "content": (<path d="M137.3-195c0 17.4 7.4 34.7 19.8 47.1l441.4 409.1c27.3 24.8 71.9 24.8 99.2 0l438.9-429c27.3-24.8 27.3-66.9 0-91.7-27.3-24.8-71.9-24.8-99.2 0L648.1 122.3 256.3-242.2c-27.3-24.8-71.9-24.8-99.2 0-12.4 14.9-19.8 29.8-19.8 47.2z" className="c1" />)
        },
        "infoIcon": {
            "svg": {
                "width": "18",
                "height": "18",
                "preserveAspectRatio": "xMidYMid",
                "viewBox": "1.5 1.5 18 18"
            },
            "content": (<g><circle cx="10.5" cy="10.5" r="8" /><path fillRule="evenodd" d="M10.5 19.5a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9zm-8-9c0 4.411 3.589 8 8 8s8-3.589 8-8-3.589-8-8-8-8 3.589-8 8zm10 5h-4l1-2v-3h-1l1-2h2v5l1 2zm-3-10h2v2h-2v-2z" /></g>)
        },
        "firstTimeInfoBoxClose": {
            "svg": {
                "width": "18",
                "height": "18",
                "viewBox": "0 0 18 18"
            },
            "content": (<path fill="none" d="M5 5l8 8M13 5l-8 8" />)
        },
        "firstTimeInfoBoxArrowRight": {
            "svg": {
                "width": "5",
                "height": "8",
                "viewBox": "0 0 5 8"
            },
            "content": (<path fill="none" d="M1 1l3 3-3 3" />)
        },
        "infoSmall": {
            "svg": {
                "width": "18",
                "height": "18",
                "viewBox": "0 0 18 18"
            },
            "content": (<path fill="#7a92a5" fillRule="evenodd" d="M9 0a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 6h2V4H8v2zm2 6V7H8L7 9h1v3l-1 1v1h4v-1l-1-1z" />)
        },
        "checkbox": {
            "svg": {
                "width": "16",
                "height": "16",
                "viewBox": "0 0 16 16"
            },
            "content": (<g><path d="M5 16c-2.335 0-5-2.66-5-5V5c0-2.34 2.665-5 5-5h6c2.335 0 5 2.66 5 5v6c0 2.34-2.665 5-5 5H4.235" className="bg" /><path d="M11.556.89A3.56 3.56 0 0 1 15.11 4.45v7.096a3.56 3.56 0 0 1-3.554 3.563H4.444A3.56 3.56 0 0 1 .89 11.55V4.452A3.56 3.56 0 0 1 4.443.89h7.112m0-.89H4.444A4.453 4.453 0 0 0 0 4.452v7.096A4.453 4.453 0 0 0 4.444 16h7.112A4.453 4.453 0 0 0 16 11.548V4.452A4.453 4.453 0 0 0 11.556 0" className="border" /><path d="M4.008 8.344c.03.205.145.4.334.534l2.78 1.96a.886.886 0 0 0 1.192-.157l3.512-4.383a.778.778 0 0 0-.164-1.132.883.883 0 0 0-1.195.155l-3 3.745-2.103-1.48a.885.885 0 0 0-1.194.162.778.778 0 0 0-.162.597" className="check" /><path d="M12 8c0 .552-.398 1-.89 1H4.89C4.397 9 4 8.552 4 8s.398-1 .89-1h6.22c.492 0 .89.448.89 1" className="minus" /></g>)
        },
/*
        "switch": {
            "svg": {
                "width": "50",
                "height": "28",
                "viewBox": "0 0 50 28"
            },
            "content": (<path d="M14 24.5C7.66 24.5 2.5 19.34 2.5 13S7.66 1.5 14 1.5h21c6.34 0 11.5 5.16 11.5 11.5S41.34 24.5 35 24.5H14" className="st1" ></path><path d="M35 2c6.065 0 11 4.935 11 11s-4.935 11-11 11H14C7.935 24 3 19.065 3 13S7.935 2 14 2h21m0-1H14C7.373 1 2 6.373 2 13s5.373 12 12 12h21c6.627 0 12-5.373 12-12S41.627 1 35 1" className="st2" ></path><g className="switch-thumb-regular" ><path d="M25 13.5C25 19.3 20.075 24 14 24S3 19.3 3 13.5v-1C3 6.7 7.925 2 14 2s11 4.7 11 10.5v1" className="switch-thumb-circle" ></path><path d="M10.008 13.344c.03.205.145.4.334.534l2.78 1.96a.886.886 0 0 0 1.192-.157l3.512-4.384a.778.778 0 0 0-.164-1.13.883.883 0 0 0-1.195.154l-3 3.744-2.103-1.48a.885.885 0 0 0-1.194.163.778.778 0 0 0-.162.597" className="switch-thumb-check" ></path><path d="M19 13c0 .552-.497 1-1.11 1h-7.78C9.5 14 9 13.552 9 13s.498-1 1.11-1h7.78c.613 0 1.11.448 1.11 1" className="switch-thumb-minus" ></path></g><g className="switch-thumb-selected" ><path d="M46 13.5C46 19.3 41.075 24 35 24s-11-4.7-11-10.5v-1C24 6.7 28.925 2 35 2s11 4.7 11 10.5v1" className="switch-thumb-circle" ></path><path d="M31.008 13.344c.03.205.145.4.334.534l2.78 1.96a.886.886 0 0 0 1.192-.157l3.512-4.384a.778.778 0 0 0-.164-1.13.883.883 0 0 0-1.195.154l-3 3.744-2.103-1.48a.885.885 0 0 0-1.194.163.778.778 0 0 0-.162.597" className="switch-thumb-check" ></path><path d="M40 13c0 .552-.497 1-1.11 1h-7.78C30.5 14 30 13.552 30 13s.498-1 1.11-1h7.78c.613 0 1.11.448 1.11 1" className="switch-thumb-minus" ></path></g>)
        },
*/
        "inputValidationError": {
            "svg": {
                "width": "25",
                "height": "25",
                "viewBox": "0 0 25 25"
            },
            "content": (<g><circle cx="13" cy="12" r="12" /><path fillRule="evenodd" d="M13 7c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1z" className="c1" /><circle cx="13" cy="17" r="1" className="c2" /></g>)
        },
        "inputValidationSuccess": {
            "svg": {
                "width": "25",
                "height": "25",
                "viewBox": "0 0 25 25"
            },
            "content": (<g><circle cx="13" cy="12" r="12" /><path fillRule="evenodd" d="M17.38 10.91l-4.68 5.25h-.01c-.07.17-.17.33-.32.43-.4.25-.91.1-1.14-.35L8.99 13.4c-.23-.45-.1-1.02.3-1.27.4-.26.91-.11 1.14.34l1.5 1.9 4.27-4.78c.33-.37.86-.37 1.18 0 .33.36.33.95 0 1.32z" className="c1" /></g>)
        },
        "image-change": {
            "svg": {
                "width": "14",
                "height": "14",
                "viewBox": "0 0 70 70"
            },
            "content": (<path fill="#3799EB" fillRule="evenodd" d="M62.5 67.5V50.83S51.67 66.91 31.39 66.91C12.75 66.91-2.42 52.5-2.42 32.5h5c0 15 12.92 29.41 28.81 29.41 10.49 0 22.25-5.77 27.36-14.83l-16.25-.2V42.5h25v25h-5zM33.67 3.09c-10.49 0-22.27 5.77-27.38 14.83l16.21.2v4.38h-25v-25h5v16.67S13.37-1.91 33.65-1.91C52.29-1.91 67.5 12.5 67.5 32.5h-5c0-15-12.94-29.41-28.83-29.41z" />)
        },
        "image-effects": {
            "svg": {
                "width": "16",
                "height": "16",
                "viewBox": "0 0 16 16"
            },
            "content": (<path fill="#3799EB" fillRule="evenodd" d="M12.5 12.83v3h-1v-3H5a2.5 2.5 0 0 1-2.5-2.5v-6.5h-3v-1h3v-3h1v3H10c1.57 0 2.5.75 2.5 2v7h3v1h-3zm-1-2v-1-5c0-.24 0-1-1.5-1H3.5v6.5c0 .83.67 1.5 1.5 1.5h6.5v-1z" />)
        },
        "showComp": {
            "svg": {
                "width": "18",
                "height": "14",
                "viewBox": "0 0 18 13"
            },
            "content": (<path fill="#3798EB" fillRule="evenodd" d="M17.78 6.19c-.11.26-2.74 6.31-8.78 6.31C2.96 12.5.33 6.45.22 6.19L.14 6l.08-.19C.33 5.55 2.96-.5 9-.5c6.04 0 8.67 6.05 8.78 6.31l.08.19-.08.19zM9 .5C4.2.5 1.73 5 1.24 6 1.73 7 4.2 11.5 9 11.5S16.27 7 16.76 6C16.27 5 13.8.5 9 .5zm0 8.6C7.29 9.1 5.9 7.71 5.9 6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1zm0-5.2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z" />)
        },
        "mobileCompWithLink": {
            "svg": {
                "width": "16",
                "height": "17",
                "viewBox": "0 0 16 17"
            },
            "content": (<path fill="#3197EF" fillRule="evenodd" d="M14.895 1.606a3.786 3.786 0 0 0-5.35 0l-1.65 1.652a.864.864 0 0 0 0 1.22.864.864 0 0 0 1.22 0l1.65-1.653a2.06 2.06 0 0 1 2.91 0 2.06 2.06 0 0 1 0 2.91l-3.328 3.33a2.06 2.06 0 0 1-2.91 0 .863.863 0 0 0-1.22 1.22 3.772 3.772 0 0 0 2.675 1.104 3.77 3.77 0 0 0 2.674-1.106l3.33-3.33a3.788 3.788 0 0 0 0-5.348zM6.89 12.522l-1.652 1.652a2.06 2.06 0 0 1-2.91 0 2.06 2.06 0 0 1 0-2.91l3.33-3.33a2.058 2.058 0 0 1 2.908 0 .864.864 0 0 0 1.22 0 .864.864 0 0 0 0-1.22 3.786 3.786 0 0 0-5.35 0l-3.327 3.33A3.757 3.757 0 0 0 0 12.72c0 1.01.394 1.96 1.11 2.674A3.77 3.77 0 0 0 3.782 16.5c.968 0 1.936-.37 2.674-1.106L8.11 13.74a.86.86 0 1 0-1.22-1.218z" />)
        },
        "delete": {
            "svg": {
                "width": "13",
                "height": "15",
                "viewBox": "0 0 13 15"
            },
            "content": (<path fill="#3799EB" d="M12 3v9a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V3H0V2h4v-.5C4 .673 4.684 0 5.525 0h1.867C8.25 0 9 .7 9 1.5V2h4v1h-1zM8 1.5c0-.248-.307-.5-.608-.5H5.525C5.24 1 5 1.23 5 1.5V2h3v-.5zM11 3H9 4 2v9a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V3zM8 5h1v6H8V5zM6 5h1v6H6V5zM4 5h1v6H4V5z" />)
        },
        "calendar": {
            "svg": {
                "width": "14",
                "height": "14",
                "viewBox": "0 0 14 14"
            },
            "content": (<path fill="#3799EB" fillRule="evenodd" d="M12 13.97H2c-1.1 0-2-1.12-2-2.22V4.06c0-1.1.9-1.9 2-1.9h2V.72c0-.28.22-.5.5-.5s.5.22.5.5v1.44h4V.72c0-.28.22-.5.5-.5s.5.22.5.5v1.44h2c1.1 0 2 .8 2 1.9v7.69c0 1.1-.9 2.22-2 2.22zm1-9.91c0-.55-.45-.9-1-.9h-2v.37c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.37H5v.37c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.37H2c-.55 0-1 .35-1 .9v7.69c0 .55.45 1.22 1 1.22h10c.55 0 1-.67 1-1.22V4.06zm-4 5h2V11H9V9.06zm0-2.97h2v2H9v-2zM6 9.06h2V11H6V9.06zm0-2.97h2v2H6v-2zM3 9.06h2V11H3V9.06zm0-2.97h2v2H3v-2z" />)
        },
        "magnifyingGlass": {
            "svg": {
                "width": "15",
                "height": "15",
                "viewBox": "0 0 15 15"
            },
            "content": (<path fill="#3799EB" fillRule="evenodd" d="M14.25 13.54l-2.84-2.85c1.02-1.17 1.65-2.67 1.65-4.3 0-3.59-3.04-6.64-6.63-6.64S-.25 2.8-.25 6.39s3.06 6.63 6.65 6.63c1.62 0 3.12-.62 4.3-1.62l2.85 2.85.7-.71zM6.4 12.05C3.37 12.05.78 9.43.78 6.39.78 3.36 3.32.75 6.35.75 9.39.75 12 3.36 12 6.39c0 3.04-2.57 5.66-5.6 5.66z" />)
        },
        "plus": {
            "svg": {
                "width": "9",
                "height": "9",
                "viewBox": "0 0 9 9"
            },
            "content": (<g><path fill="#3799EB" d="M4 0h1v9H4z" /><path fill="#3799EB" d="M0 4h9v1H0z" /></g>)
        },
        "camera": {
            "svg": {
                "width": "55",
                "height": "42",
                "viewBox": "0 0 55 42"
            },
            "content": (<g><path fill="#5B99E7" fillRule="evenodd" d="M46.06 14.94c1.11 0 2-.89 2-1.99 0-1.09-.89-1.98-2-1.98-1.1 0-2 .89-2 1.98 0 1.1.9 1.99 2 1.99m0 2c-2.21 0-4-1.79-4-3.99s1.79-3.98 4-3.98 4 1.78 4 3.98-1.79 3.99-4 3.99z" /><path fill="#5B99E7" fillRule="evenodd" d="M50.06 39.94c1.66 0 3-1.35 3-3V8.97c0-1.66-1.34-3-3-3H5.09c-1.65 0-3 1.34-3 3v27.97c0 1.65 1.35 3 3 3h44.97m0 2H5.09c-2.76 0-5-2.24-5-5V8.97c0-2.76 2.24-5 5-5h44.97c2.76 0 5 2.24 5 5v27.97c0 2.76-2.24 5-5 5z" /><path fill="#5B99E7" fillRule="evenodd" d="M28.08 34.94c6.61 0 11.98-5.38 11.98-11.99s-5.37-11.98-11.98-11.98-11.99 5.37-11.99 11.98 5.38 11.99 11.99 11.99m0 2c-7.73 0-13.99-6.26-13.99-13.99 0-7.72 6.26-13.98 13.99-13.98 7.72 0 13.98 6.26 13.98 13.98 0 7.73-6.26 13.99-13.98 13.99zM38.89 3.97a2.99 2.99 0 0 0-2.83-2H19.09c-1.3 0-2.41.83-2.82 2h22.62m2.17 2H14.09v-1c0-2.76 2.24-5 5-5h16.97c2.76 0 5 2.24 5 5v1z" /></g>)
        },
        "contactForm": {
            "svg": {
                "width": "22",
                "height": "22",
                "preserveAspectRatio": "xMidYMid",
                "viewBox": "0 0 22 22"
            },
            "content": (<path fillRule="evenodd" d="M21.883 3.745a2.177 2.177 0 0 0-2.177-2.177H2.294A2.177 2.177 0 0 0 .117 3.745v14.51c0 1.202.975 2.177 2.177 2.177h17.412a2.177 2.177 0 0 0 2.177-2.177V3.745zm-1.798-.725l-9.04 6.752L1.963 3.02h18.122zm-.38 15.96H2.296c-.402 0-.727-.932-.727-1.33V3.475l9.17 6.914a.505.505 0 0 0 .613 0l9.08-6.846v14.104c0 .4-.323 1.332-.724 1.332z" className="cls-4" />)
        },
        "fillDesign": {
            "svg": {
                "width": "11",
                "height": "15",
                "preserveAspectRatio": "xMidYMid",
                "viewBox": "0 0 11 15"
            },
            "content": (<path fillRule="evenodd" d="M5.464-.006S-.01 4.116-.01 8.704c0 3.06 2.505 5.29 5.497 5.29s5.45-2.23 5.45-5.29c0-4.588-5.473-8.71-5.473-8.71zm-.526 11c-1 0-2-1.12-2-2.5s1-2.5 2-2.5v5z" className="cls-2" />)
        },
        "upgrade": {
            "svg": {
                "width": "16",
                "height": "14",
                "viewBox": "0 0 16 14"
            },
            "content": (<path fill="#2B3F4F" fillRule="evenodd" d="M16 0l-1 11H1L0 0h2s-.35 3 2.56 3C7.48 3 7 0 7 0h2s-.4 3.02 2.48 3.02S14 0 14 0h2zm-1 14H1v-2h14v2z" />)
        },
        "PPOpenMonthlyArrow": {
            "svg": {
                "width": "15",
                "height": "15",
                "viewBox": "0 0 15 15"
            },
            "content": (<g><path fill="#549CD5" d="M10.6 7.7l-4.3 3.5V4.3z" /><circle cx="7.5" cy="7.5" r="6.8" fill="none" stroke="#549CD5" stroke-miterlimit="10" /></g>)
        },
        "arrowLeftSmall": {
            "svg": {
                "width": "3",
                "height": "5",
                "viewBox": "0 0 3 5"
            },
            "content": (<path fill="#3899EC" d="M.466 2.99L0 2.5l.31-.327L2.07.327 2.378 0 3 .653 2.69.98 1.242 2.5 2.69 4.02l.31.327L2.38 5l-.312-.327L.466 2.99z" />)
        },
        "cyclePickerMoreArrow": {
            "svg": {
                "width": "9",
                "height": "5",
                "viewBox": "0 0 9 5"
            },
            "content": (<path fill="#5C9AE9" fillRule="evenodd" d="M4.46 5L0 0h2l2.38 3L7 0h2L4.46 5z" />)
        },
        "linkBtnThin": {
            "svg": {
                "width": "24",
                "height": "24",
                "viewBox": "0 0 24 24"
            },
            "content": (<path d="M17.1 6.9c-1.25-1.25-3.197-1.19-4.526.14l-.887.885.605.606.886-.886c1.002-1 2.396-1.06 3.318-.14.92.92.86 2.316-.14 3.318l-1.694 1.695c-.478.477-1.076.757-1.683.788a2.132 2.132 0 0 1-1.64-.644l-.605.605a2.99 2.99 0 0 0 2.13.898c.054 0 .105 0 .157-.003.82-.043 1.618-.41 2.244-1.04l1.695-1.693c1.33-1.33 1.39-3.277.14-4.527zm-6.278 9.456c-.477.476-1.072.755-1.68.785-.602.042-1.182-.192-1.636-.646-.454-.454-.678-1.02-.647-1.637.03-.606.31-1.202.784-1.68l1.695-1.694c.995-.997 2.39-1.054 3.31-.133l.606-.605c-1.253-1.25-3.197-1.194-4.522.133L7.04 12.573c-.628.627-.996 1.423-1.036 2.242-.042.853.276 1.664.896 2.285.6.6 1.364.9 2.14.9.84 0 1.697-.348 2.387-1.04l.865-.865-.605-.604-.865.866z" />)
        },
        "pencil": {
            "svg": {
                "width": "12",
                "height": "14",
                "viewBox": "0 0 14 14"
            },
            "content": (<path fill="#2B5571" fillRule="evenodd" d="M13.01 2.06L11.43.48c-.74-.74-2.03-.74-2.77 0L7.38 1.77l-.32.32-5.95 5.95-1.4 5.74 5.74-1.4 5.95-5.95 1.61-1.6c.76-.77.76-2.01 0-2.77zM.6 12.89l1.2-3.73 2.53 2.53-3.73 1.2zm4.64-1.55l-1.23-1.23 3.24-3.24-.63-.63-3.24 3.24-1.23-1.22 5.23-5.23 3.08 3.09-5.22 5.22zm7.14-7.14l-1.29 1.29L8.01 2.4l1.28-1.29c.41-.4 1.11-.4 1.51 0l1.58 1.58c.41.41.41 1.09 0 1.51z" />)
        },
        "image-btn": {
            "svg": {
                "width": "34",
                "height": "34",
                "viewBox": "0 0 34 34"
            },
            "content": (<path d="M21 11h-8a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zm-7.5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-1.422 9l3-3.004 1 1.998 3-3.997 3 5.003h-10z" className="st0" />)
        },
        "benefitsModalVSign": {
            "svg": {
                "width": "9",
                "height": "8",
                "viewBox": "-.2 0 9 7.7"
            },
            "content": (<path fill="#2B5672" d="M8.33 1.75L3.64 7.02c0 .01 0 .01-.01.01-.07.17-.17.32-.32.42-.4.26-.91.11-1.14-.34L-.08 4.26c-.23-.45-.09-1.03.31-1.29s.91-.1 1.14.35l1.5 1.91L7.15.42c.33-.37.85-.37 1.18 0 .33.37.33.96 0 1.33z" />)
        },
        "mba_Phone_number": {
            "svg": {
                "width": "34",
                "height": "34",
                "viewBox": "0 0 34 34"
            },
            "content": (<g fill="#2D4150" fillRule="evenodd" ><path d="M14.858 11.574L13.83 9.882a1 1 0 0 0-1.56-.188l-.572.57a1 1 0 0 0 0 1.415l2.01 2.01.963-.962a1 1 0 0 0 .188-1.154M14.393 20.936c2.177 2.177 4.778 3.364 6.9 1.242l-2.16-2.16c-.706.708-1.63-.214-2.618-1.203l-2.053-2.053c-.99-.99-1.912-1.913-1.205-2.62l-2.16-2.158c-2.12 2.12-.933 4.722 1.243 6.9l2.053 2.052M21.702 18.418l1.692 1.028a1 1 0 0 1 .19 1.56l-.573.573a1 1 0 0 1-1.413 0l-2.01-2.013.96-.962a1 1 0 0 1 1.155-.187" /></g>)
        },
        "mba_email": {
            "svg": {
                "width": "34",
                "height": "34",
                "viewBox": "0 0 34 34"
            },
            "content": (<g fill="#2D4150" fillRule="evenodd" ><path d="M24.33 12.132A2.982 2.982 0 0 0 22 11H12a2.99 2.99 0 0 0-2.52 1.383l7.534 5.97 7.316-6.22M9.078 13.34A2.995 2.995 0 0 0 9 14v6c0 .663.222 1.27.585 1.766l4.637-4.35-5.144-4.076M24.41 21.77c.367-.497.59-1.105.59-1.77v-6c0-.343-.07-.668-.176-.975l-5.107 4.342 4.694 4.403" /><path d="M17.035 19.647l-2.022-1.603-4.715 4.423A2.98 2.98 0 0 0 12 23h10c.63 0 1.215-.197 1.698-.53L18.95 18.02l-1.915 1.63" /></g>)
        },
        "arrowDrillDown":{
        	"svg": {
                "width": "8",
                "height": "13",
                "viewBox": "0 0 8 13"
            },
            "content": (<g fill="#3899ec" fillRule="evenodd" class="cls-1"><path data-name="arrow copy 4" d="M888.905,395.988a0.681,0.681,0,0,0,.5-0.222l4.395-4.741a0.792,0.792,0,0,0,0-1.061l-4.6-4.74a0.669,0.669,0,0,0-.992,0,0.79,0.79,0,0,0,0,1.063l4.11,4.211-3.9,4.21a0.79,0.79,0,0,0,0,1.064A0.673,0.673,0,0,0,888.905,395.988Z" transform="translate(-887 -384.015)"/></g>)
        }
    };

    var symbols = _.defaults(customIcons, editorIcons);

    return addAliases(symbols, aliases);
});
