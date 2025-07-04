import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../Components/FeedHeader';
import CustomButton from '../../Components/CustomButton';
import {LanguageContext} from '../../localization/LanguageContext';
import strings from '../../localization';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      accountHolder: 'John Doe',
      accountNumber: '1234 5678 9012',
      ifscCode: 'ABCD0123456',
      branchName: 'Downtown Branch',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      id: '2',
      accountHolder: 'Jane Smith',
      accountNumber: '9876 5432 1098',
      ifscCode: 'XYZB0987654',
      branchName: 'Uptown Branch',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/706/706830.png',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  });

  const handleAddAccount = () => {
    const {strings} = useContext(LanguageContext);
    if (
      form.accountHolder &&
      form.accountNumber &&
      form.ifscCode &&
      form.branchName
    ) {
      const newAccount = {
        ...form,
        id: Date.now().toString(),
      };
      setAccounts(prev => [...prev, newAccount]);
      setForm({
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      });
      setModalVisible(false);
    }
  };

  const handleDelete = id => {
    setAccounts(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {/* Delete Image (Top Right) */}
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDelete(item.id)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png',
          }}
          style={styles.deleteImage}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{strings.account_holder_name}</Text>
        <Text style={styles.value}>{item.accountHolder}</Text>

        <Text style={styles.label}>{strings.account_number}</Text>
        <Text style={styles.value}>{item.accountNumber}</Text>

        <Text style={styles.label}>IFSC Code</Text>
        <Text style={styles.value}>{item.ifscCode}</Text>

        <Text style={styles.label}>{strings.branch}</Text>
        <Text style={styles.value}>{item.branchName}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={strings.account_details} />
      <View style={{padding: 16, flex: 1}}>
        <FlatList
          data={accounts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 16}}
        />

        {/* <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Bank Account</Text>
        </TouchableOpacity> */}
        <CustomButton
          style={{marginBottom: 25}}
          title={strings.add_bank_account}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Add Account Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{strings.add_bank_account}</Text>

            <TextInput
              placeholder={strings.account_holder_name}
              style={styles.input}
              value={form.accountHolder}
              onChangeText={text =>
                setForm(prev => ({...prev, accountHolder: text}))
              }
            />
            <TextInput
              placeholder={strings.account_number}
              style={styles.input}
              value={form.accountNumber}
              onChangeText={text =>
                setForm(prev => ({...prev, accountNumber: text}))
              }
              keyboardType="numeric"
            />
            <TextInput
              placeholder="IFSC Code"
              style={styles.input}
              value={form.ifscCode}
              onChangeText={text =>
                setForm(prev => ({...prev, ifscCode: text}))
              }
            />
            <TextInput
              placeholder={strings.branch}
              style={styles.input}
              value={form.branchName}
              onChangeText={text =>
                setForm(prev => ({...prev, branchName: text}))
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: '#333'}}>{strings.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddAccount}>
                <Text style={{color: '#fff'}}>{strings.save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#28a745',
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
  },

  deleteImage: {
    width: 18,
    height: 18,
    tintColor: 'red',
  },
});
