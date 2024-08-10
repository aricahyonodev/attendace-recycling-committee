'use server'
async function postSheet(formData) {
    console.log(formData.get('test'));
}

export {postSheet}