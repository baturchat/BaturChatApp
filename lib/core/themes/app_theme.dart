
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static final ThemeData lightTheme = ThemeData(
    primaryColor: const Color(0xFF1E88E5),
    scaffoldBackgroundColor: Colors.white,
    appBarTheme: AppBarTheme(
      color: const Color(0xFF1E88E5),
      elevation: 0,
      iconTheme: const IconThemeData(color: Colors.white),
      titleTextStyle: GoogleFonts.poppins(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),
    ),
    colorScheme: const ColorScheme.light(
      primary: Color(0xFF1E88E5),
      secondary: Color(0xFF1E88E5),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
    ),
    textTheme: TextTheme(
      bodyLarge: GoogleFonts.poppins(color: Colors.black87),
      bodyMedium: GoogleFonts.poppins(color: Colors.black54),
      titleLarge: GoogleFonts.poppins(fontWeight: FontWeight.bold),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF1E88E5),
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    ),
  );

  static final ThemeData darkTheme = ThemeData(
    primaryColor: const Color(0xFF1E88E5),
    scaffoldBackgroundColor: const Color(0xFF121212),
    appBarTheme: AppBarTheme(
      color: const Color(0xFF1E1E1E),
      elevation: 0,
      iconTheme: const IconThemeData(color: Colors.white),
      titleTextStyle: GoogleFonts.poppins(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),
    ),
    colorScheme: const ColorScheme.dark(
      primary: Color(0xFF1E88E5),
      secondary: Color(0xFF1E88E5),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      background: Color(0xFF121212),
      surface: Color(0xFF1E1E1E),
    ),
    textTheme: TextTheme(
      bodyLarge: GoogleFonts.poppins(color: Colors.white),
      bodyMedium: GoogleFonts.poppins(color: Colors.white70),
      titleLarge: GoogleFonts.poppins(
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF1E88E5),
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    ),
  );
}
