import { isNumber } from 'lodash'
export const commaFormat = (value) => {
    if(!isNumber(value)) return value
    if(value) {
        return new Intl.NumberFormat
            (
                'en-IN', 
                {
                    style: 'currency',
                    currency: 'BDT',
                    // maximumSignificantDigits: 1 
                }
            )
            .format(value).replace('BDT', '').replace('.00', '')
            .trim()
    } else {
        return 0.00
    }
}