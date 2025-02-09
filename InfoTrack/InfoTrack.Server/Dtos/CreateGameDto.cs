using System;

namespace InfoTrack.Server.Dtos;

public record CreateGameDto(string GameName, int minNumber, int maxNumber, int TimeLimit, NumberToWordDto[] NumbersToWords);

public record NumberToWordDto(int Number, string Word);

public record SubmitAnswer(Guid GameId, string Answer);
