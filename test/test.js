
const axios = require('axios');
const expect = require("chai").expect;

const host = 'https://petstore.swagger.io/v2';

describe('Swagger Pet Store API Tests', function () {

    it('Find pet by Id', async function () {
        const id = '500';
        const response = await axios.get(host + `/pet/${id}`);
        expect(response.data).to.include({ id: 500 })
    }
    ).timeout(10000)

    it('Update pet name', async function () {
        const id = 500;
        const name = 'goofy';
        const updateResponse = await axios.put(host + `/pet`, {
            id,
            name: name,
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    id: id + '1',
                    name: name + 'Tag'
                }
            ],
            status: "pending"
        });
        const getResponse = await axios.get(host + `/pet/${id}`);
        expect(getResponse.data).to.include({ id })
        expect(getResponse.data).to.include({ name })
    }
    ).timeout(10000)

    it('Delete a pet', async function () {
        // step 1: create a new pet, to be deleted in next step
        const id = 5077;
        const name = 'urchin';
        const updateResponse = await axios.put(host + `/pet`, {
            id,
            name: name,
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    id: id + '1',
                    name: name + 'Tag'
                }
            ],
            status: "pending"
        });

        // step 2: delete pet
        const deleteResponse = await axios.delete(host + `/pet/${id}`)

        // step 3: verify if pet has been deleted
        try {
            var getResponse = await axios.get(host + `/pet/${id}`);
            expect(getResponse.data).to.not.include({ id })     
        } catch (err) {
            if (err.hasOwnProperty('response')) {  // 404 response, check if pet is deleted
                expect(err.response.data).to.include({ message: 'Pet not found' })
            } else {  // pet not deleted, throwing err out for reporting
                throw err
            }
        }
    }
    ).timeout(10000)


}
)