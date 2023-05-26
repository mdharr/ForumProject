package com.skilldistillery.lorehunter.enums;

public enum GameRating {
    ZERO("0"), HALF("0.5"), ONE("1"), ONE_AND_A_HALF("1.5"), TWO("2"), TWO_AND_A_HALF("2.5"), THREE("3"),
    THREE_AND_A_HALF("3.5"), FOUR("4"), FOUR_AND_A_HALF("4.5"), FIVE("5");

    private final String rating;

    private GameRating(String rating) {
        this.rating = rating;
    }

    public String getRating() {
        return rating;
    }
}

