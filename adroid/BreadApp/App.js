import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');

  async function order() {
    await fetch('https://YOUR_DOMAIN/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        size: 'small',
        payment_method: 'cash'
      })
    });

    Alert.alert('ተሳክቷል', 'የዳቦ ትዕዛዝዎ ተቀብሏል');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>ዳቦ ትዕዛዝ</Text>
      <TextInput placeholder="ስልክ ቁጥር" onChangeText={setPhone} />
      <Button title="አሁን ይዘዙ" onPress={order} />
    </View>
  );
}
