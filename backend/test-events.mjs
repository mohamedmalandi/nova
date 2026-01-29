import axios from 'axios';

async function testEvents() {
    try {
        console.log('Fetching all events...');
        const allEvents = await axios.get('http://localhost:5000/api/events');
        console.log('\n=== ALL EVENTS ===');
        console.log(JSON.stringify(allEvents.data, null, 2));

        console.log('\n\nFetching active events only...');
        const activeEvents = await axios.get('http://localhost:5000/api/events?activeOnly=true');
        console.log('\n===ACTIVE EVENTS ===');
        console.log(JSON.stringify(activeEvents.data, null, 2));
        console.log(`\nTotal active events: ${activeEvents.data.length}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testEvents();
