import { StyleSheet, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BOTPRESS_URL } from '@/services/botpress-service';

export default function AIChatScreen() {
  // Custom CSS to inject for dark theme
  const darkThemeCSS = `
    :root {
      --theme-primary: #2B95DC !important;
      --theme-background: #1A1A1A !important;
      --theme-background-2: #242424 !important;
      --theme-background-3: #2D2D2D !important;
      --theme-text: #FFFFFF !important;
      --theme-text-light: #E0E0E0 !important;
      --theme-text-lighter: #BBBBBB !important;
    }
    
    .bpw-layout {
      background-color: var(--theme-background) !important;
      border: none !important;
    }

    .bpw-header-container {
      background-color: var(--theme-background-2) !important;
      border-bottom: 1px solid var(--theme-background-3) !important;
    }

    .bpw-chat-bubble-content {
      background-color: var(--theme-background-2) !important;
      color: var(--theme-text) !important;
    }

    .bpw-from-bot .bpw-chat-bubble .bpw-chat-bubble-content {
      background-color: var(--theme-background-3) !important;
    }

    .bpw-from-user .bpw-chat-bubble .bpw-chat-bubble-content {
      background-color: var(--theme-primary) !important;
    }

    .bpw-composer {
      background-color: var(--theme-background-2) !important;
      border-top: 1px solid var(--theme-background-3) !important;
    }

    .bpw-composer textarea {
      background-color: var(--theme-background-3) !important;
      color: var(--theme-text) !important;
    }

    .bpw-button {
      background-color: var(--theme-background-3) !important;
      color: var(--theme-text) !important;
    }

    .bpw-button:hover {
      background-color: var(--theme-primary) !important;
    }

    .bpw-typing-bubble {
      background-color: var(--theme-background-3) !important;
    }
  `;

  const injectedJavaScript = `
    const style = document.createElement('style');
    style.textContent = ${JSON.stringify(darkThemeCSS)};
    document.head.appendChild(style);
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ThemedText style={styles.pageTitle}>AI Chat</ThemedText>

      <ThemedView style={styles.chatContainer}>
        <WebView
          source={{ uri: BOTPRESS_URL }}
          style={styles.webview}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          injectedJavaScript={injectedJavaScript}
          onMessage={(event) => {
            console.log('WebView message:', event.nativeEvent.data);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn(
              'WebView received error status code: ',
              nativeEvent.statusCode
            );
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 16,
    marginTop: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 