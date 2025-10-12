
import 'package:batur_chat/presentation/screens/auth/login_screen.dart';
import 'package:batur_chat/presentation/screens/chat/chat_screen.dart';
import 'package:batur_chat/presentation/screens/home/home_screen.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/chat',
      builder: (context, state) => const ChatScreen(),
    ),
  ],
);
