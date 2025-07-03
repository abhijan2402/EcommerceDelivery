import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../../Components/FeedHeader';

const mockTickets = [
  {
    id: '1',
    name: 'John Doe',
    orderId: '#ORD1234',
    title: 'Delayed Order',
    description: 'I have not received my order yet. Please update the status.',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Jane Smith',
    orderId: '#ORD5678',
    title: 'Incorrect Product',
    description: 'Received a different item than ordered.',
    status: 'Resolved',
  },
  {
    id: '63',
    name: 'Jane Smith',
    orderId: '#ORD5678',
    title: 'Incorrect Product',
    description: 'Received a different item than ordered.',
    status: 'Resolved',
  },
  {
    id: '5',
    name: 'Jane Smith',
    orderId: '#ORD5678',
    title: 'Incorrect Product',
    description: 'Received a different item than ordered.',
    status: 'Resolved',
  },
];

const Ticket = () => {
  const [tickets] = useState(mockTickets);
  const [replies, setReplies] = useState({});

  const handleReplyChange = (text, id) => {
    setReplies({...replies, [id]: text});
  };

  const handleSend = id => {
    console.log(`Reply to ticket ${id}: ${replies[id]}`);
    setReplies({...replies, [id]: ''});
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Pending':
        return '#FFA500'; // Orange
      case 'Resolved':
        return '#28a745'; // Green
      case 'Rejected':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Grey
    }
  };

  const renderTicket = ({item}) => (
    <View style={styles.ticketCard}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={[
            styles.statusTag,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.orderId}>{item.orderId}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.replyRow}>
        <TextInput
          style={styles.replyInput}
          placeholder="Type your reply..."
          placeholderTextColor="#666"
          value={replies[item.id] || ''}
          onChangeText={text => handleReplyChange(text, item.id)}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={() => handleSend(item.id)}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3682/3682321.png',
            }}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header showBack title="Tickets" />
          <FlatList
            data={tickets}
            keyExtractor={item => item.id}
            renderItem={renderTicket}
            contentContainerStyle={styles.listContainer}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Leave space for keyboard
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  orderId: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    marginTop: 6,
    color: '#444',
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  replyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    fontSize: 14,
    marginRight: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: '#007bff',
  },
});
