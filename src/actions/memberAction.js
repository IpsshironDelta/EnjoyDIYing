// export const UPDATE_NAME   = 'UPDATE_NAME';
// export const UPDATE_AGE    = 'UPDATE_AGE';
export const UPDATE_FORM   = 'UPDATE_FORM';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

// export const updateName = name => {
//     return {
//         type: UPDATE_NAME,
//         payload: name
//     }
// }

export const updateForm = form => {
    return {
        type: UPDATE_FORM,
        payload: form
    }
}

export const updateRecipe = recipe => {
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    }
}

// export const updateAge = age => {
//     return {
//         type: UPDATE_AGE,
//         payload: age
//     }
// }
