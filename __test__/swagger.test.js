
const axios = require('axios');
const expect = require("chai").expect;

const host = 'https://petstore.swagger.io/v2';

describe('Swagger Pet Store API Tests', function () {

    it('Find pet by Id', async function () {
        const id = '500';
        const response = await axios.get(host + `/pet/${id}`);
        expect(response.data).to.include({ id: 500 })
    }
    )

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

        const getResponse = await axios.get(host + `/pet/500`);
        expect(getResponse.data).to.include({ id: 500 })
        expect(getResponse.data).to.include({ name: 'goofy' })
    }
    )

    it('Delete a pet', async function () {
        // create a new pet, to be deleted in next step
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

        // delete pet
        const deleteResponse = await axios.delete(host + `/pet/${id}`)

        var getResponse;

        try {
            getResponse = await axios.get(host + `/pet/${id}`);
        } catch (err) {
            console.log('Try catch getResponse ', getResponse)
        }

        //expect(getResponse.statusCode).to.equal(404);

        //console.log(getResponse)


    }
    )


}
)