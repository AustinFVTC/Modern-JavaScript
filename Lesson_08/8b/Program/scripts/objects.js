"use strict";

/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Custom Objects Used in Poker Games
      Author: Austin Lennert
      Date:   10/17/22

      Filename:       objects.js
 */

let pokerGame = {
   currentBank: null,
   currentBet: null,
   placeBet: function () {
      this.currentBank -= this.currentBet;
      return this.currentBank;
   },

   payBet: function (type) {
      let pay = 0;
      switch (type) {
         case "Royal Flush": pay = 250; break
         case "Straight Flush": pay = 50; break
         case "Four of a Kind": pay = 25; break
         case "Full House": pay = 9; break
         case "Flush": pay = 6; break
         case "Straight": pay = 4; break
         case "Three of a Kind": pay = 3; break
         case "Two Pair": pay = 2; break
         case "Jacks or Better": pay = 1; break
      }
      this.currentBank += pay*this.currentBet;
      return this.currentBank;
   }

};

/** Poker Card Class. Classes properly introduced in ES6 */
class PokerCard {
   /** Constructor function for poker cards */
   constructor(cardSuit, cardRank) {
      this.suit = cardSuit;
      this.rank = cardRank;
   }

   /** Returns the image name of the card */
   cardImage() {
      return "images/" + this.rank + "_" + this.suit + ".png";
   }
}


class PokerDeck {
   /** Constructor function for poker decks */
   constructor() {
      // Initialize object properties
      this.cards = [];  // Property of the object

      // List the suits and ranks
      let suits = ["clubs", "diamonds", "hearts", "spades"];  // Not a property of the object, only has scope inside the constructor
      let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];


      // Add a card for each combination of suit and rank
      for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 13; j++) {
            this.cards.push(new PokerCard(suits[i], ranks[j]));
         }
      }

      
   }

   shuffle() {
      this.cards.sort(function () {
         return 0.5 - Math.random();
      });
   }

   dealTo(pokerHand) {
      let cardsDealt = pokerHand.cards.length;
      pokerHand.cards = this.cards.splice(0, cardsDealt);
   }
};


class PokerHand {
   /**
    * Poker Hand Constructor
    * @param {int} handLength - Number of hands able to hold in hand
    */
   constructor(handLength) {
      this.cards = new Array(handLength);
   }

   replaceCard(index, pokerDeck) {
      this.cards[index] = pokerDeck.cards.shift();
   }

   /** Determines the value of the pokerHand */
   getHandValue() {
      return handType(this);
      
      /** ------------------------------------------------+
      | The handType() function returns a text string of |
      | the type of hand held by 5-card poker hand.      |
      +-------------------------------------------------*/
      function handType(pokerHand) {
         /* Determine the rank value of each card in the hand
            by creating a property named rankValue         */
         for (let i = 0; i < pokerHand.cards.length; i++) {
            if (pokerHand.cards[i].rank === "ace") {
               pokerHand.cards[i].rankValue = 14;
            } else if (pokerHand.cards[i].rank === "king") {
               pokerHand.cards[i].rankValue = 13;
            } else if (pokerHand.cards[i].rank === "queen") {
               pokerHand.cards[i].rankValue = 12;
            } else if (pokerHand.cards[i].rank === "jack") {
               pokerHand.cards[i].rankValue = 11;
            } else {
               pokerHand.cards[i].rankValue = parseInt(pokerHand.cards[i].rank);
            }
         }

         /* Function to return the highest ranked value in a five-card hand */
         function highCard() {
            return Math.max(pokerHand.cards[0].rankValue, pokerHand.cards[1].rankValue,
               pokerHand.cards[2].rankValue, pokerHand.cards[3].rankValue,
               pokerHand.cards[4].rankValue);
         }

         /* Function to test for the presence of a flush in which all
            five cards have the same suit */
         function hasFlush() {
            let firstSuit = pokerHand.cards[0].suit;
            return pokerHand.cards.every(function (card) {
               return card.suit === firstSuit;
            });
         };

         /* Function to test for the presence of a straight in which the
            rank value of the cards can be placed in sequential order */
         function hasStraight() {
            pokerHand.cards.sort(function (a, b) {
               return a.rankValue - b.rankValue;
            });
            return pokerHand.cards.every(function (card, i, cards) {
               if (i > 0) {
                  return (cards[i].rankValue - cards[i - 1].rankValue === 1);
               } else {
                  return true;
               }
            });
         };

         /* Function to test for the presence of a straight flush */
         function hasStraightFlush() {
            return hasFlush() && hasStraight();
         };

         /* Function to test for the presence of a royal flush 
            which consists of 10-J-Q-K-A of the same suit */
         function hasRoyalFlush() {
            return hasStraightFlush() && highCard() === 14;
         };

         /* Function to test for the presence of: pairs, two pairs,
            three of a kind, four of a kind, and full houses  */
         function hasSets() {
            // handSets creates an associative array of the duplicates in the hand
            let handSets = {};
            pokerHand.cards.forEach(function (card) {
               if (handSets.hasOwnProperty(card.rankValue)) {
                  handSets[card.rankValue]++;
               } else {
                  handSets[card.rankValue] = 1;
               }
            });

            let sets = "none";
            let pairRank;

            for (let cardRank in handSets) {
               if (handSets[cardRank] === 4) { sets = "Four of a Kind"; }
               if (handSets[cardRank] === 3) {
                  if (sets === "Pair") { sets = "Full House"; }
                  else { sets = "Three of a Kind"; }
               }
               if (handSets[cardRank] === 2) {
                  if (sets === "Three of a Kind") { sets = "Full House"; }
                  else if (sets === "Pair") { sets = "Two Pair"; }
                  else { sets = "Pair"; pairRank = cardRank; }
               }
            }

            if (sets === "Pair" && pairRank >= 11) {
               sets = "Jacks or Better";
            }

            return sets;
         }

         // Return a text string describing the hand for draw poker //
         if (hasRoyalFlush()) { return "Royal Flush"; }
         else if (hasStraightFlush()) { return "Straight Flush"; }
         else if (hasFlush()) { return "Flush"; }
         else if (hasStraight()) { return "Straight"; }
         else {
            let sets = hasSets();
            if (sets === "Pair" || sets === "none") { sets = "No Winner"; }
            return sets;
         }
      }
      /* ------------------------------------------------+
      |             End of the  handType() function      |
      +-------------------------------------------------*/
   }
}

















































