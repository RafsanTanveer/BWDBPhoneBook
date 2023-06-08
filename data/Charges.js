
export const Charges = ({ presentCharge }) => {

    let charge = presentCharge === 'R' ? '' :
        presentCharge === 'C' ? ',CC' :
            presentCharge === 'A' ? ',Addl.' :
                presentCharge === 'I' ? ',Incharge' : ''

    return charge

}
