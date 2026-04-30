# 📱 Agendador de Mensagens WhatsApp

Aplicativo Android nativo para agendamento de mensagens do WhatsApp, desenvolvido em React Native com TypeScript.

## 🎯 Funcionalidades

- ✅ Agendar mensagens para contatos do WhatsApp
- ✅ Selecionar contatos da agenda do telefone
- ✅ Definir data e hora para envio
- ✅ Notificações no horário agendado
- ✅ Abertura automática do WhatsApp com mensagem pré-preenchida
- ✅ Editar e excluir mensagens agendadas
- ✅ Visualizar histórico de mensagens enviadas
- ✅ Interface intuitiva e moderna

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Java Development Kit (JDK) 11 ou superior
- Android Studio (para emulador ou build)
- Android SDK (API 24 ou superior)
- WhatsApp instalado no dispositivo

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd agendador-zap
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o ambiente Android

Certifique-se de ter as seguintes variáveis de ambiente configuradas:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Execute o aplicativo

#### No emulador ou dispositivo conectado:

```bash
npm run android
# ou
yarn android
```

#### Iniciar o Metro Bundler separadamente:

```bash
npm start
# ou
yarn start
```

## 🔐 Permissões Necessárias

O aplicativo solicita as seguintes permissões:

- **READ_CONTACTS**: Para acessar a lista de contatos
- **POST_NOTIFICATIONS**: Para enviar notificações
- **SCHEDULE_EXACT_ALARM**: Para agendar alarmes exatos
- **WAKE_LOCK**: Para manter o dispositivo acordado durante o envio
- **REQUEST_IGNORE_BATTERY_OPTIMIZATIONS**: Para garantir funcionamento em segundo plano

## 📱 Como Usar

### Agendar uma Nova Mensagem

1. Toque no botão **"+"** (Nova Mensagem)
2. Selecione um contato da sua agenda
3. Digite a mensagem que deseja enviar
4. Escolha a data e hora para o envio
5. Toque em **"Agendar"**

### Editar uma Mensagem Agendada

1. Toque na mensagem que deseja editar
2. Faça as alterações necessárias
3. Toque em **"Atualizar"**

### Excluir uma Mensagem

1. Toque no ícone de **lixeira** na mensagem
2. Confirme a exclusão

### Enviar Mensagem Imediatamente

1. Toque no ícone de **enviar** na mensagem agendada
2. Confirme o envio
3. O WhatsApp será aberto automaticamente

## 🏗️ Estrutura do Projeto

```
agendador-zap/
├── android/                    # Configurações Android
│   ├── app/
│   │   ├── src/main/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── build.gradle
│   ├── gradle.properties
│   └── settings.gradle
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ContactPicker.tsx
│   │   ├── DateTimePicker.tsx
│   │   ├── FloatingButton.tsx
│   │   └── MessageItem.tsx
│   ├── contexts/              # Context API
│   │   └── MessagesContext.tsx
│   ├── navigation/            # Navegação
│   │   └── AppNavigator.tsx
│   ├── screens/               # Telas do app
│   │   ├── AddMessageScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── services/              # Serviços
│   │   ├── notificationService.ts
│   │   ├── permissionService.ts
│   │   ├── storageService.ts
│   │   └── whatsappService.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── utils/                 # Utilitários
│       └── dateUtils.ts
├── App.tsx                    # Componente principal
├── index.js                   # Entry point
├── package.json
└── tsconfig.json
```

## 🔧 Tecnologias Utilizadas

- **React Native 0.73**: Framework principal
- **TypeScript**: Tipagem estática
- **React Navigation**: Navegação entre telas
- **React Native Paper**: Componentes UI Material Design
- **Notifee**: Sistema de notificações
- **AsyncStorage**: Armazenamento local
- **React Native Contacts**: Acesso aos contatos
- **DateTimePicker**: Seletor de data e hora

## ⚠️ Limitações Conhecidas

1. **Envio Manual**: O WhatsApp não permite envio 100% automático por questões de segurança. O usuário precisa confirmar o envio manualmente.

2. **Background Tasks**: Android 12+ tem restrições severas em tarefas em segundo plano. É recomendado desativar a otimização de bateria para o app.

3. **WhatsApp Instalado**: O aplicativo requer que o WhatsApp esteja instalado no dispositivo.

## 🔍 Solução de Problemas

### Notificações não aparecem

1. Verifique se as permissões de notificação foram concedidas
2. Desative a otimização de bateria para o app
3. Verifique se o horário agendado está no futuro

### WhatsApp não abre

1. Verifique se o WhatsApp está instalado
2. Verifique se o número de telefone está no formato correto
3. Tente reinstalar o WhatsApp

### App fecha em segundo plano

1. Desative a otimização de bateria nas configurações do Android
2. Adicione o app à lista de apps protegidos (em dispositivos Samsung/Xiaomi)
3. Permita que o app execute em segundo plano

## 📝 Build para Produção

### Gerar APK de Debug

```bash
cd android
./gradlew assembleDebug
```

O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

### Gerar APK de Release

1. Gere uma keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure o arquivo `android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3. Gere o APK:

```bash
cd android
./gradlew assembleRelease
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por Bob

---

**Nota**: Este aplicativo foi desenvolvido para fins educacionais e de automação pessoal. Use com responsabilidade e respeite as políticas de uso do WhatsApp.