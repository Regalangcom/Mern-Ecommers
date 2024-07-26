const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('id-ID',{
        style : "currency",
        currency : 'IDR',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayINRCurrency