import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Header from '../../Components/FeedHeader';
import {useApi} from '../../Backend/Api';
import RenderHTML from 'react-native-render-html';

const Cms = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {title, slug} = route.params;
  const {getRequest} = useApi();
  const {width} = useWindowDimensions();

  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCMSContent();
  }, []);

  const fetchCMSContent = async () => {
    try {
      const response = await getRequest(`api/delivery/cms-page/${slug}`);
      if (response?.success && response?.data?.description) {
        setHtmlContent(response.data.description);
      } else {
        setHtmlContent('<p>Content not found.</p>');
      }
    } catch (error) {
      console.error('CMS Page Error:', error);
      setHtmlContent('<p>An error occurred while fetching the content.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={title} showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <RenderHTML
            contentWidth={width}
            source={{html: htmlContent}}
            tagsStyles={{
              h2: {fontSize: 20, fontWeight: '700', marginBottom: 10},
              h3: {fontSize: 18, fontWeight: '600', marginBottom: 8},
              p: {
                fontSize: 15,
                lineHeight: 22,
                color: '#444',
                marginBottom: 10,
              },
              li: {marginBottom: 6, color: '#333', fontSize: 15},
              strong: {fontWeight: 'bold'},
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Cms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
});
