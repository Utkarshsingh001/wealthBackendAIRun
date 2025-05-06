// const assetTypes = [
    //     {
    //         name: "FD",
    //         fields : [
    //             {
    //                 fieldName: 'Bank/Institution Name',
    //                 fieldType: 'TEXT',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 1,
    //             },
    //             {
    //                 fieldName: 'Compounding Frequency',
    //                 fieldType: 'SELECT',
    //                 enumOptions: ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'],
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 2,
    //             },
    //             {
    //                 fieldName: 'Auto Renewal',
    //                 fieldType: 'RADIO',
    //                 isRequired: false,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 3,
    //             },
    //             {
    //                 fieldName: 'Is Tax Saver FD?',
    //                 fieldType: 'RADIO',
    //                 isRequired: false,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 4,
    //             },
    //             {
    //                 fieldName: 'FD Maturity Value',
    //                 fieldType: 'CURRENCY',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 5,
    //             },
    //             {
    //                 fieldName: 'Purchase Date',
    //                 fieldType: 'DATE',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 6,
    //             },
    //             {
    //                 fieldName: 'Maturity Date',
    //                 fieldType: 'DATE',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 7,
    //             },
    //             {
    //                 fieldName: 'Expected Return (% p.a.)',
    //                 fieldType: 'NUMBER',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //                 order: 8,
    //             },
    //         ]
    //     },
    //     {
    //         name: "MUTUAL_FUND",
    //         fields : [
    //             {
    //                 fieldName: 'Investment Type:',
    //                 fieldType: 'SELECT',
    //                 enumOptions: ['SIP', 'LumpSum'],
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Monthly SIP',
    //                 fieldType: 'CURRENCY',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Total Invested Till Now',
    //                 fieldType: 'CURRENCY',
    //                 isRequired: false,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Is Tax Saver FD?',
    //                 fieldType: 'RADIO',
    //                 isRequired: false,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'FD Maturity Value',
    //                 fieldType: 'NUMBER',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Purchase Date',
    //                 fieldType: 'DATE',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Maturity Date',
    //                 fieldType: 'DATE',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //             {
    //                 fieldName: 'Expected Return (% p.a.)',
    //                 fieldType: 'NUMBER',
    //                 isRequired: true,
    //                 permission: 'EDITABLE',
    //                 assetTypeId: 1,
    //             },
    //         ]
    //     },
    //     {
    //         name: "Forex",
    //         description: "The foreign exchange market, where currencies are traded.",
    //     },
    //     {
    //         name: "ETF",
    //         description: "An exchange-traded fund is an investment fund traded on stock exchanges, much like stocks.",
    //     },
    //     {
    //         name: "Stock",
    //         description: "A type of security that signifies ownership in a corporation and represents a claim on part of the corporation's assets and earnings.",
    //     },
    //     {
    //         name: "Bond",
    //         description: "A fixed income instrument that represents a loan made by an investor to a borrower.",
    //     },
    //     {
    //         name: "Real Estate",
    //         description: "Property consisting of land or buildings.",
    //     },
    //     {
    //         name: "Cryptocurrency",
    //         description: "A digital or virtual currency that uses cryptography for security.",
    //     }
    // ];