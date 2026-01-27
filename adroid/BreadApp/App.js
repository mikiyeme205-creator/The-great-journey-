import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [size, setSize] = useState('small');

  async function order() {
    await fetch('http://YOUR_SERVER_IP:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        size,
        payment_method: 'cash'
      })
    });
    alert('ትዕዛዝ ተልኳል');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>ዳቦ ትዕዛዝ</Text>

      <TextInput
        placeholder="ስልክ ቁጥር"
        onChangeText={setPhone}
      />

      <Button title="አሁን ይዘዙ" onPress={order} />
    </View>
  );
}
