using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using FluentAssertions;
using InfoTrack.Server.Data;
using NUnit.Framework;
using Xunit;
using Assert = Xunit.Assert;

namespace InfoTrack.Unit.Tests;

public sealed class UserGameValidationTests
{
    protected readonly Fixture AutoFixture;

    public UserGameValidationTests()
    {
        AutoFixture = new Fixture();;
    }

    [Fact]
    public void GameNameValidationTest()
    {
        // ARRANGE
        // ACT
        Action action = () => UserGame.Create(null, 0, 0, 0, [new NumberToWord(0, "")]);

        // ASSERT
        action.Should().Throw<ArgumentNullException>().WithMessage("Value cannot be null. (Parameter 'gameName')");
    }
    
    [Xunit.Theory]
    [InlineData(-1, 10, 1, 1,  "minRange", "min must be greater than zero")]
    [InlineData(1, 1, 1, 1,  "minRange", "max must be greater than min")]
    [InlineData(11, 1, 1, 1,  "maxRange", "max must be greater than min")]
    [InlineData(11, 100, 0, 1,  "timeLimitInSeconds", "time limit must be greater than zero")]
    [InlineData(11, 100, -1, 1,  "timeLimitInSeconds", "time limit must be greater than zero")]
    [InlineData(11, 100, 1, 1,  "gameRule", "divisor must be greater than min")]
    [InlineData(1, 100, 1, 0,  "gameRule", "divisor must be greater than 0")]
    public void GameRangeValidationTest(int min, int max, int timeLimit, int divisor, string paramName, string because)
    {
        // ARRANGE
        // ACT
        Action action = () => UserGame.Create("Valid", min, max, timeLimit, [new NumberToWord(divisor, "VALID")]);

        // ASSERT
        action.Should().Throw<ArgumentOutOfRangeException>(because: because).WithParameterName(paramName);
    }
    
    [Fact]
    public void GameRulesValidationTest()
    {
        // ARRANGE
        var count = 10;
        var gameRules = new List<NumberToWord>();
        for (var i = 1; i <= count; i++)
        {
            gameRules.Add(new NumberToWord(i, AutoFixture.Create<string>()));
        }

        // ACT
        var sut = UserGame.Create("Valid", 1, 20, 10, gameRules.ToArray());

        // ASSERT
        sut.GameRules.Should().HaveCount(count);
    }
    
    [Fact]
    public void GameRulesMaxValidationTest()
    {
        // ARRANGE
        var gameRules = new List<NumberToWord>();
        for (var i = 1; i <= 10; i++)
        {
            gameRules.Add(new NumberToWord(i, AutoFixture.Create<string>()));
        }

        // ACT
        Action action = () => UserGame.Create("Valid", 1, 8, 10, gameRules.ToArray());

        // ASSERT
        action.Should().Throw<ArgumentOutOfRangeException>(because: "We tried to add a game rule with a divisor greater than the max range");
    }
    
    //Action action = () => 
}