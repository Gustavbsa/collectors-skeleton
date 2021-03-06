//Group 4 Jakob Gimbringer, Gustav Boström, Thomas Parker, Fredrik Fleron
function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      if (data.joinGame(d.roomId, d.playerId)) {
        io.to(d.roomId).emit('collectorsInitialize', { 
            labels: data.getUILabels(d.roomId),
            players: data.getPlayers(d.roomId),
            itemsOnSale: data.getItemsOnSale(d.roomId),
            marketValues: data.getMarketValues(d.roomId),
            skillsOnSale: data.getSkillsOnSale(d.roomId),
            auctionCards: data.getAuctionCards(d.roomId),
            placements: data.getPlacements(d.roomId),
            boughtAuction: data.getBoughtAuction(d.roomId),
            market: data.getMarket(d.roomId),
            skillValue: data.getSkillValue(d.roomId, d.playerId),
            playOrder: data.getPlayOrder(d.roomId),
            actingPlayer: data.getActingPlayer(d.roomId),
            round: data.getRound(d.roomId, d.playerId) 
          }
        );
      }
    });
    socket.on('collectorsDrawCard', function(d) {
      io.to(d.roomId).emit('collectorsUpdatePlayers',
        data.drawCard(d.roomId, d.playerId)
      );
    });

    socket.on('collectorsBuyCard', function(d) {
      data.buyCard(d.roomId, d.playerId, d.card, d.cost, d.hand)
      io.to(d.roomId).emit('collectorsCardBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          itemsOnSale: data.getItemsOnSale(d.roomId),
          actingPlayer: data.nextPlayer(d.roomId),
        }
      );
    });

    socket.on('collectorsSkillCard', function(d) { 
      data.buySkill(d.roomId, d.playerId, d.card, d.cost, d.hand),
      io.to(d.roomId).emit('collectorsSkillBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          skillsOnSale: data.getSkillsOnSale(d.roomId), 
          skillValue: data.getSkillValue(d.roomId, d.playerId),
          actingPlayer: data.nextPlayer(d.roomId),
        }
      );
    });
    socket.on('collectorsAuction', function(d) { 
      data.buyAuction(d.roomId, d.playerId, d.card, d.cost, d.hand),
      io.to(d.roomId).emit('collectorsAuctionBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId),
          boughtAuction: data.getBoughtAuction(d.roomId),
          actingPlayer: data.nextPlayer(d.roomId),
          
        }
      );
    });
    socket.on('collectorsGetAuction', function(d) { 
      data.auctionBid(d.roomId, d.playerId, d.card, d.cost),
      io.to(d.roomId).emit('collectorsAuctionBid', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId),
          boughtAuction: data.getBoughtAuction(d.roomId)
        }
      );
    });
    socket.on('collectorsNewRound', function(d) { 
      io.to(d.roomId).emit('collectorsCheck', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          nextRound:  data.checkRound(d.roomId)
        }
      );
    });
    socket.on('collectorsgetMoney', function(d) { 
      data.getMoney(d.roomId, d.playerId, d.extraMoney),
      io.to(d.roomId).emit('collectorsGotMoney', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
        }
      );
    });
    socket.on('collectorsNumButtons', function(d) { 
      data.getNumActions(d.roomId, d.playerId),
      io.to(d.roomId).emit('collectorsLostAction', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
        }
      );
    });
    socket.on('collectorsMarket', function(d) { 
      data.buyMarket(d.roomId, d.playerId, d.card, d.cost, d.typeAction, d.secondAction)
      if(d.secondAction){
        io.to(d.roomId).emit('collectorsMarketBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          market: data.getMarket(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId), 
          skillsOnSale: data.getSkillsOnSale(d.roomId),
          marketValues: data.getMarketValues(d.roomId),
          actingPlayer: data.getActingPlayer(d.roomId),
        }
      );
      }
      else{
      io.to(d.roomId).emit('collectorsMarketBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          market: data.getMarket(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId), 
          skillsOnSale: data.getSkillsOnSale(d.roomId),
          marketValues: data.getMarketValues(d.roomId),
          actingPlayer: data.nextPlayer(d.roomId), 
        }
      );
      }
    });
    socket.on('collectorsWork', function(d) { 
      data.buyWork(d.roomId, d.playerId, d.cost, d.index),
      io.to(d.roomId).emit('collectorsWorkBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          actingPlayer: data.nextPlayer(d.roomId),  
        }
      );
    });

    
    socket.on('collectorsPlaceBottle', function(d) {
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.index);
      io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId),{
        players: data.getPlayers(d.roomId),
        placements: data.getPlacements(d.roomId),
        playOrder: data.getPlayOrder(d.roomId),
        actingPlayer: data.getActingPlayer(d.roomId)
      }
      );
    });

    socket.on('collectorsRefillCards', function(d) {
      data.refillCards(d.roomId,d.playerId);
      io.to(d.roomId).emit('collectorsCardsRefilled',{
        itemsOnSale: data.getItemsOnSale(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        players: data.getPlayers(d.roomId),
        checkEnd: data.checkEnd(d.roomId),
        round: data.getRound(d.roomId,d.playerId),
      }
      );
    });

    socket.on('collectorsResetPlacement', function(d) {
      io.to(d.roomId).emit('collectorsPlacementReset', data.getPlacements(d.roomId),{
        players: data.getPlayers(d.roomId),
        placements: data.getPlacements(d.roomId),
      }
      );
    });

}

module.exports = sockets;