package com.skilldistillery.lorehunter.enums;

public enum GameCategory {
    PLAYED, PLAYING;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
