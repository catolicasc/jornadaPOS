import { useSignInEmailPassword } from '@nhost/react';
import { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useRouter } from "expo-router";
import { useNhostClient } from '@nhost/react';

export default function Login() {
    // Estados para campos do formulário e UI
    const [email, setEmail] = useState('luiz@jornadatecnologia.com');
    const [password, setPassword] = useState('123456789');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMessage, setShowMessage] = useState(null);
    const [needsVerification, setNeedsVerification] = useState(false);

    // Hooks Nhost
    const { signInEmailPassword, isLoading, isError, error } = useSignInEmailPassword();
    const nhostClient = useNhostClient();
    const router = useRouter();

    // Verificar se já está autenticado ao carregar o componente
    useEffect(() => {
        const checkAuthStatus = async () => {
            const isAuthenticated = await nhostClient.auth.isAuthenticatedAsync();
            if (isAuthenticated) {
                router.replace('/products');
            }
        };

        checkAuthStatus();
    }, []);

    const validateForm = () => {
        if (!email.trim()) {
            setShowMessage({ type: 'error', text: 'Email é obrigatório' });
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setShowMessage({ type: 'error', text: 'Email inválido' });
            return false;
        }

        if (!password) {
            setShowMessage({ type: 'error', text: 'Senha é obrigatória' });
            return false;
        }

        return true;
    };

    // Handler de login
    const handleLogin = async () => {
        try {
            // Limpa mensagens anteriores
            setShowMessage(null);
            setNeedsVerification(false);

            // Evita múltiplos envios
            if (isSubmitting) return;

            // Valida o formulário
            if (!validateForm()) return;

            setIsSubmitting(true);

            // Tenta login
            const result = await signInEmailPassword(email, password);
            console.log("Resultado do login:", result);

            // Verifica se precisa de verificação de email
            if (result?.needsEmailVerification) {
                setNeedsVerification(true);
                setShowMessage({
                    type: 'info',
                    text: 'Por favor, verifique seu email para ativar sua conta.'
                });
            } else if (result?.isSuccess) {
                router.replace('/products');
            }

        } catch (err) {
            console.error("Erro inesperado:", err);
            setShowMessage({
                type: 'error',
                text: 'Ocorreu um erro inesperado. Tente novamente.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Função para reenviar email de verificação
    const handleResendVerification = async () => {
        try {
            setIsSubmitting(true);

            // Use a API do Nhost para reenviar o email de verificação
            const { error } = await nhostClient.auth.sendVerificationEmail({ email });

            if (error) {
                setShowMessage({
                    type: 'error',
                    text: 'Não foi possível enviar o email de verificação: ' + error.message
                });
            } else {
                setShowMessage({
                    type: 'success',
                    text: 'Email de verificação enviado. Por favor, verifique sua caixa de entrada.'
                });
            }
        } catch (err) {
            console.error("Erro ao reenviar verificação:", err);
            setShowMessage({
                type: 'error',
                text: 'Erro ao enviar email de verificação.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Mensagem de erro da API do Nhost
    useEffect(() => {
        if (isError && error) {
            let message = error.message;

            // Personaliza mensagens de erro comuns
            if (message.includes('Invalid email or password')) {
                message = 'Email ou senha inválidos';
            } else if (message.includes('Email needs verification')) {
                setNeedsVerification(true);
                message = 'Por favor, verifique seu email para ativar sua conta.';
            }

            setShowMessage({ type: 'error', text: message });
        }
    }, [isError, error]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.formContainer}>
                    {/* Logo ou imagem do app */}
                    <View style={styles.logoContainer}>
                        {/* Você pode substituir isto por sua própria imagem */}
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>JT</Text>
                        </View>
                        <Text style={styles.appName}>Jornada Tecnologia</Text>
                    </View>

                    <Text style={styles.title}>Acessar conta</Text>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setShowMessage(null);
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                            editable={!isLoading && !isSubmitting}
                        />
                    </View>

                    {/* Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setShowMessage(null);
                            }}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="password"
                            editable={!isLoading && !isSubmitting}
                        />
                    </View>

                    {/* Mensagem de erro ou sucesso */}
                    {showMessage && (
                        <View style={[
                            styles.messageContainer,
                            showMessage.type === 'error' ? styles.errorContainer :
                                showMessage.type === 'success' ? styles.successContainer :
                                    styles.infoContainer
                        ]}>
                            <Text style={[
                                styles.messageText,
                                showMessage.type === 'error' ? styles.errorText :
                                    showMessage.type === 'success' ? styles.successText :
                                        styles.infoText
                            ]}>
                                {showMessage.text}
                            </Text>
                        </View>
                    )}

                    {/* Botão de login */}
                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            (isLoading || isSubmitting) && styles.loginButtonDisabled
                        ]}
                        onPress={handleLogin}
                        disabled={isLoading || isSubmitting}
                        activeOpacity={0.8}
                    >
                        {(isLoading || isSubmitting) ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    {/* Botão de reenviar verificação (apenas se necessário) */}
                    {needsVerification && (
                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={handleResendVerification}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.resendButtonText}>
                                Reenviar email de verificação
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Links adicionais */}
                    <View style={styles.linksContainer}>
                        <TouchableOpacity style={styles.linkButton}>
                            <Text style={styles.linkText}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.linkButton}
                            onPress={() => router.push('/signup')} // Ajuste para a sua rota de cadastro
                        >
                            <Text style={styles.linkText}>Criar nova conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Fundo mais claro para uma sensação moderna
    },
    keyboardView: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        maxWidth: 400,
        width: '100%',
        alignSelf: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 15,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },
    logoText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    appName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    messageContainer: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    errorContainer: {
        backgroundColor: '#FDECEA', // Vermelho claro para erros
        borderLeftWidth: 4,
        borderLeftColor: '#E53935',
    },
    successContainer: {
        backgroundColor: '#E8F5E9', // Verde claro para sucessos
        borderLeftWidth: 4,
        borderLeftColor: '#43A047',
    },
    messageText: {
        fontSize: 14,
    },
    errorText: {
        color: '#D32F2F',
    },
    successText: {
        color: '#2E7D32',
    },
    loginButton: {
        backgroundColor: '#3498db',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    loginButtonDisabled: {
        backgroundColor: '#95c8ec',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linksContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linkButton: {
        padding: 5,
    },
    linkText: {
        color: '#3498db',
        fontSize: 14,
    }
});