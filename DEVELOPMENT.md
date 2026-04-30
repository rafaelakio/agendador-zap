# 🛠️ Guia de Desenvolvimento - Agendador Zap

## 📚 Visão Geral Técnica

Este documento fornece informações detalhadas sobre a arquitetura, estrutura e desenvolvimento do aplicativo.

## 🏗️ Arquitetura

### Padrões de Design Utilizados

1. **Context API**: Gerenciamento de estado global para mensagens
2. **Service Layer**: Separação de lógica de negócios em serviços
3. **Component-Based**: Componentes reutilizáveis e modulares
4. **Type Safety**: TypeScript para tipagem estática

### Fluxo de Dados

```
User Action → Screen → Context → Service → Storage/API
                ↓
            Component Update
```

## 📁 Estrutura Detalhada

### Componentes (`src/components/`)

#### ContactPicker.tsx
- Seletor de contatos com busca
- Integração com API de contatos do Android
- Modal com lista filtrada

#### DateTimePicker.tsx
- Seletor de data e hora
- Validação de datas futuras
- Formatação localizada (pt-BR)

#### FloatingButton.tsx
- Botão de ação flutuante (FAB)
- Posicionamento fixo
- Ícone e label customizáveis

#### MessageItem.tsx
- Card de mensagem agendada
- Status visual (pendente/enviada/falhou)
- Ações: editar, excluir, enviar

### Telas (`src/screens/`)

#### HomeScreen.tsx
- Lista de mensagens agendadas
- Pull-to-refresh
- Navegação para adicionar/editar
- Ordenação por status e data

#### AddMessageScreen.tsx
- Formulário de nova mensagem
- Validação de campos
- Modo edição/criação
- Keyboard-aware scroll

### Serviços (`src/services/`)

#### storageService.ts
- CRUD de mensagens no AsyncStorage
- Serialização/deserialização de datas
- Backup e recuperação

#### notificationService.ts
- Agendamento de notificações com Notifee
- Criação de canais Android
- Trigger baseado em timestamp
- Ações de notificação

#### whatsappService.ts
- Integração com WhatsApp via deep linking
- Formatação de números de telefone
- Validação de instalação do WhatsApp
- Encoding de mensagens

#### permissionService.ts
- Solicitação de permissões Android
- Verificação de status
- Direcionamento para configurações
- Acesso à lista de contatos

### Contexto (`src/contexts/`)

#### MessagesContext.tsx
- Estado global de mensagens
- Operações CRUD
- Sincronização com storage
- Integração com notificações

## 🔧 Configuração do Ambiente

### Requisitos de Sistema

```json
{
  "node": ">=18.0.0",
  "npm": ">=9.0.0",
  "java": ">=11.0.0",
  "android-sdk": ">=33"
}
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
# Configurações de desenvolvimento
DEV_MODE=true
LOG_LEVEL=debug
```

### Instalação de Dependências

```bash
# Instalar dependências do projeto
npm install

# Instalar pods do iOS (se necessário)
cd ios && pod install && cd ..

# Limpar cache do Metro
npm start -- --reset-cache
```

## 🧪 Testes

### Estrutura de Testes

```
__tests__/
├── components/
├── screens/
├── services/
└── utils/
```

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com coverage
npm test -- --coverage

# Testes em modo watch
npm test -- --watch
```

## 🐛 Debug

### React Native Debugger

1. Instale o React Native Debugger
2. Execute o app em modo debug
3. Abra o debugger: `Cmd+D` (iOS) ou `Cmd+M` (Android)
4. Selecione "Debug"

### Logs

```typescript
// Habilitar logs detalhados
import { LogBox } from 'react-native';

// Ignorar warnings específicos
LogBox.ignoreLogs(['Warning: ...']);

// Logs customizados
console.log('[DEBUG]', data);
console.error('[ERROR]', error);
```

### Flipper

O projeto está configurado para usar Flipper:

1. Instale o Flipper Desktop
2. Execute o app
3. Conecte ao dispositivo/emulador
4. Acesse logs, network, layout inspector

## 📦 Build e Deploy

### Debug Build

```bash
# Android
cd android
./gradlew assembleDebug

# Instalar no dispositivo
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Release Build

```bash
# Gerar keystore (primeira vez)
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 \
  -validity 10000

# Build release
cd android
./gradlew assembleRelease

# APK gerado em:
# app/build/outputs/apk/release/app-release.apk
```

### Bundle AAB (Google Play)

```bash
cd android
./gradlew bundleRelease

# AAB gerado em:
# app/build/outputs/bundle/release/app-release.aab
```

## 🔄 Versionamento

### Atualizar Versão

1. Edite `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2
    versionName "1.1.0"
}
```

2. Edite `package.json`:

```json
{
  "version": "1.1.0"
}
```

### Changelog

Mantenha um arquivo `CHANGELOG.md` atualizado:

```markdown
## [1.1.0] - 2026-05-01
### Added
- Nova funcionalidade X
### Fixed
- Correção do bug Y
```

## 🚀 Performance

### Otimizações Implementadas

1. **Lazy Loading**: Componentes carregados sob demanda
2. **Memoization**: React.memo para componentes pesados
3. **FlatList**: Renderização eficiente de listas
4. **AsyncStorage**: Cache de dados locais
5. **Hermes**: Engine JavaScript otimizada

### Monitoramento

```typescript
// Performance monitoring
import { InteractionManager } from 'react-native';

InteractionManager.runAfterInteractions(() => {
  // Código após animações
});
```

## 🔐 Segurança

### Boas Práticas

1. **Não commitar**: Keystore, senhas, tokens
2. **Validação**: Sempre validar inputs do usuário
3. **Permissões**: Solicitar apenas o necessário
4. **HTTPS**: Usar conexões seguras
5. **Ofuscação**: ProGuard em builds de release

### Dados Sensíveis

```typescript
// Usar SecureStore para dados sensíveis
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('key', 'value');
const value = await SecureStore.getItemAsync('key');
```

## 📊 Monitoramento e Analytics

### Integração Futura

- Firebase Analytics
- Crashlytics
- Performance Monitoring
- Remote Config

## 🤝 Contribuindo

### Workflow

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add: nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrões de Código

- **ESLint**: Seguir regras configuradas
- **Prettier**: Formatação automática
- **TypeScript**: Tipagem estrita
- **Commits**: Conventional Commits

### Code Review

- Todos os PRs precisam de review
- Testes devem passar
- Coverage mínimo: 80%
- Sem warnings do TypeScript

## 📚 Recursos Adicionais

### Documentação

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Notifee](https://notifee.app/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

### Comunidade

- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [Discord React Native](https://discord.gg/react-native)

## 🐛 Problemas Conhecidos

### Android 12+

- Restrições de alarmes exatos
- Solução: Direcionar usuário para configurações

### Otimização de Bateria

- Apps podem ser mortos em background
- Solução: Solicitar exclusão de otimização

### WhatsApp Business

- Pode ter comportamento diferente
- Testar em ambas as versões

## 📝 TODO

- [ ] Implementar testes unitários
- [ ] Adicionar testes E2E
- [ ] Integrar CI/CD
- [ ] Adicionar suporte a iOS
- [ ] Implementar backup na nuvem
- [ ] Adicionar templates de mensagens
- [ ] Suporte a mensagens recorrentes
- [ ] Múltiplos destinatários
- [ ] Anexos (imagens, documentos)

---

**Última atualização**: 2026-04-30