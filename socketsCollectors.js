function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      if (data.joinGame(d.roomId, d.playerId)) {
        socket.emit('collectorsInitialize', { 
            labels: data.getUILabels(d.roomId),
            players: data.getPlayers(d.roomId),
            itemsOnSale: data.getItemsOnSale(d.roomId),
            marketValues: data.getMarketValues(d.roomId),
            skillsOnSale: data.getSkillsOnSale(d.roomId),
            auctionCards: data.getAuctionCards(d.roomId),
            placements: data.getPlacements(d.roomId),
            boughtAuction: data.getBoughtAuction(d.roomId),
            market: data.getMarket(d.roomId)
          }
        );
      }
    });
    socket.on('collectorsDrawCard', function(d) {
      io.to(d.roomId).emit('collectorsCardDrawn', 
        data.drawCard(d.roomId, d.playerId)
      );
    });
    socket.on('collectorsBuyCard', function(d) {
      data.buyCard(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('collectorsCardBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          itemsOnSale: data.getItemsOnSale(d.roomId) 
        }
      );
    });
    socket.on('collectorsSkillCard', function(d) { 
      data.buySkill(d.roomId, d.playerId, d.card, d.cost),
      io.to(d.roomId).emit('collectorsSkillBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          skillsOnSale: data.getSkillsOnSale(d.roomId) 
        }
      );
    });
    socket.on('collectorsAuction', function(d) { 
      data.buyAuction(d.roomId, d.playerId, d.card, d.cost),
      io.to(d.roomId).emit('collectorsAuctionBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId),
          boughtAuction: data.getBoughtAuction(d.roomId)
          
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
    socket.on('collectorsMarket', function(d) { 
      data.buyMarket(d.roomId, d.playerId, d.card, d.cost, d.typeAction),
      io.to(d.roomId).emit('collectorsMarketBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          market: data.getMarket(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId), 
          skillsOnSale: data.getSkillsOnSale(d.roomId),
          marketValues: data.getMarketValues(d.roomId),
         
        }
      );
    });
    socket.on('collectorsWork', function(d) { 
      data.buyWork(d.roomId, d.playerId, d.cost, d.index),
      io.to(d.roomId).emit('collectorsWorkBought', { 
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
        }
      );
    });

    
    socket.on('collectorsPlaceBottle', function(d) {
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.index);
      io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId),
      );
    });
}

module.exports = sockets;