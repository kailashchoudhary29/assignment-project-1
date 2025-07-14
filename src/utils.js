const axios = require('axios');


class RudderstackAPI {
  constructor() {
    //identify event endpoint
    this.dataPlaneUrl = `${process.env.RUDDERSTACK_DATA_PLANE_URL}/v1/identify`;
    this.writeKey = process.env.RUDDERSTACK_WRITE_KEY; // Username for Basic Auth
    
  }

  async sendIdentifyEvent() {
    const payload = {
      userId: 'user1',
      anonymousId: 'anon-id-new',
      context: {
        traits: {
          trait1: 'quantina3@oardkeyb.com',
        },
        ip: '14.5.67.21',
        library: {
          name: 'http',
        },
      },
      timestamp: '2020-02-02T00:23:09.544Z',
    };

    try {
      const response = await axios.post(this.dataPlaneUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          anonymousId: 'anon-id-test',
        },
        auth: {
      username: process.env.RUDDERSTACK_WRITE_KEY,
      password: ''
    }
      });

      console.log('Identify event sent correctly:', response.status);
    } catch (error) {
      console.error('Failed to send event:', error.response?.data || error.message);
    }
  }
}


exports.RudderstackAPI = RudderstackAPI;